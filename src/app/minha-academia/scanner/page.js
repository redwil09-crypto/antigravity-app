'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Navigation from '@/components/Navigation';
import './scanner.css';

export default function GymScanner() {
  const router = useRouter();
  const { gyms, currentGymId, saveGymProfile, showToast } = useApp();
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const currentGym = gyms.find(g => g.id === currentGymId);

  // Redireciona se não houver academia selecionada
  if (!currentGymId) {
    if (typeof window !== 'undefined') {
      router.push('/minha-academia');
    }
    return null;
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        showToast('Apenas imagens são suportadas no momento.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const processImages = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setResults(null);

    try {
      const res = await fetch('/api/scan-gym', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao processar imagens.');
      }

      if (data.equipments) {
        // Marca itens de baixa confiança para confirmação manual
        const processedResults = data.equipments.map(eq => ({
          ...eq,
          confirmed: eq.confidence >= 85
        }));
        setResults(processedResults);
      } else {
        showToast('Nenhum equipamento identificado.', 'error');
      }

    } catch (error) {
      console.error(error);
      showToast(error.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = (index, isConfirmed) => {
    setResults(prev => {
      const newResults = [...prev];
      if (isConfirmed) {
        newResults[index].confirmed = true;
        newResults[index].confidence = 100; // Sobe a confiança já que foi validado manualmente
      } else {
        // Remove da lista se rejeitado
        newResults.splice(index, 1);
      }
      return newResults;
    });
  };

  const saveInventory = () => {
    const itemsToSave = results.filter(r => r.confirmed);
    
    // Mescla com inventário existente sem duplicatas exatas pelo nome
    const existingNames = new Set((currentGym.inventory || []).map(i => i.name));
    const newItems = itemsToSave.filter(item => !existingNames.has(item.name));

    const updatedGym = {
      ...currentGym,
      inventory: [...(currentGym.inventory || []), ...newItems]
    };

    saveGymProfile(updatedGym);
    showToast(`${newItems.length} equipamentos adicionados!`, 'success');
    router.push('/minha-academia');
  };

  return (
    <>
      <Navigation />
      <div className="scanner-container fade-in">
        
        {/* Step indicator */}
        {!isProcessing && !results && (
          <div className="step-indicator">
            <div className="step active">
              <span className="step-num">1</span>
              <span className="step-label">Fotografar</span>
            </div>
            <div className="step-line" />
            <div className="step">
              <span className="step-num">2</span>
              <span className="step-label">Analisar IA</span>
            </div>
            <div className="step-line" />
            <div className="step">
              <span className="step-num">3</span>
              <span className="step-label">Confirmar</span>
            </div>
            <div className="step-line" />
            <div className="step">
              <span className="step-num">4</span>
              <span className="step-label">Salvar</span>
            </div>
          </div>
        )}

        {/* Etapa 1: Upload */}
        {!isProcessing && !results && (
          <>
            <div className="scanner-header">
              <h1>📸 Scanner de Academia</h1>
              <p>Fotografe os equipamentos ou áreas da academia <strong>{currentGym?.name}</strong></p>
            </div>

            <div className="upload-options">
              <button className="upload-btn upload-btn-camera" onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.capture = 'environment';
                input.multiple = true;
                input.onchange = (e) => handleFileChange(e);
                input.click();
              }}>
                <span className="upload-btn-icon">📷</span>
                <span className="upload-btn-text">Abrir Câmera</span>
                <span className="upload-btn-sub">Fotografe equipamento por equipamento</span>
              </button>
              <button className="upload-btn upload-btn-gallery" onClick={() => fileInputRef.current?.click()}>
                <span className="upload-btn-icon">🖼️</span>
                <span className="upload-btn-text">Galeria</span>
                <span className="upload-btn-sub">Escolha fotos já salvas</span>
              </button>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{display: 'none'}}
              />
            </div>

            {images.length > 0 && (
              <>
                <div className="preview-grid">
                  {images.map((img, idx) => (
                    <div key={idx} className="preview-item">
                      <img src={img} alt={`Preview ${idx}`} />
                      <button className="remove-btn" onClick={() => removeImage(idx)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="scan-actions">
                  <button className="btn-process" onClick={processImages}>
                    Analisar {images.length} foto(s) com IA ✨
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* Etapa 2: Processando */}
        {isProcessing && (
          <>
            <div className="step-indicator">
              <div className="step done">
                <span className="step-num">✓</span>
                <span className="step-label">Fotografar</span>
              </div>
              <div className="step-line" />
              <div className="step active">
                <span className="step-num">2</span>
                <span className="step-label">Analisar IA</span>
              </div>
              <div className="step-line" />
              <div className="step">
                <span className="step-num">3</span>
                <span className="step-label">Confirmar</span>
              </div>
              <div className="step-line" />
              <div className="step">
                <span className="step-num">4</span>
                <span className="step-label">Salvar</span>
              </div>
            </div>
            <div className="processing-state fade-in">
              <div className="scanner-animation">
                <div className="scanner-line"></div>
              </div>
              <h2>IA Analisando Equipamentos...</h2>
              <p style={{color: '#a1a1aa'}}>Buscando em nosso banco de dados da Biblioteca Elite.</p>
            </div>
          </>
        )}

        {/* Etapa 3: Resultados */}
        {results && !isProcessing && (
          <div className="results-state fade-in">
            <div className="step-indicator">
              <div className="step done">
                <span className="step-num">✓</span>
                <span className="step-label">Fotografar</span>
              </div>
              <div className="step-line" />
              <div className="step done">
                <span className="step-num">✓</span>
                <span className="step-label">Analisar IA</span>
              </div>
              <div className="step-line" />
              <div className="step active">
                <span className="step-num">3</span>
                <span className="step-label">Confirmar</span>
              </div>
              <div className="step-line" />
              <div className="step">
                <span className="step-num">4</span>
                <span className="step-label">Salvar</span>
              </div>
            </div>
            <div className="results-header">
              <h2>Resultados da Análise</h2>
              <button className="btn btn-secondary" onClick={() => {setResults(null); setImages([]);}}>
                Escanear Mais
              </button>
            </div>

            {results.some(r => !r.confirmed) && (
              <div className="confidence-warning">
                <strong>⚠️ Confirmação Necessária</strong>
                <p>Alguns equipamentos foram identificados com baixa confiança. Por favor, confirme se eles realmente existem na academia.</p>
              </div>
            )}

            <div className="results-list">
              {results.map((item, idx) => (
                <div key={idx} className={`result-item ${!item.confirmed ? 'low-confidence' : ''}`}>
                  <div>
                    <div style={{fontWeight: 600, fontSize: '1.1rem'}}>{item.name}</div>
                    <div style={{fontSize: '0.85rem', color: '#a1a1aa'}}>
                      {item.category} • Confiança: {item.confidence}%
                    </div>
                  </div>
                  
                  {!item.confirmed ? (
                    <div className="result-actions">
                      <button className="btn-confirm" onClick={() => handleConfirm(idx, true)}>Sim</button>
                      <button className="btn-reject" onClick={() => handleConfirm(idx, false)}>Não</button>
                    </div>
                  ) : (
                    <div style={{color: '#10b981'}}>✅ Validado</div>
                  )}
                </div>
              ))}
            </div>

            {results.length > 0 && (
              <div className="scan-actions" style={{marginTop: '2rem'}}>
                <button 
                  className="btn-process" 
                  onClick={saveInventory}
                  disabled={results.some(r => !r.confirmed)}
                >
                  Adicionar {results.filter(r => r.confirmed).length} Itens ao Inventário
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}
