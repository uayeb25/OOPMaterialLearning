import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw, Link } from 'lucide-react'

interface CatalogDocument {
  _id: string
  id_catalog_type: string
  id_catalog_type_obj?: string
  name: string
  description: string
  cost: number
  discount: number
  active: boolean
}

interface CatalogTypeDocument {
  _id: string
  description: string
  active: boolean
}

interface LookupStepProps {
  catalogs: CatalogDocument[]
  catalogTypes: CatalogTypeDocument[]
}

export const LookupStep = ({ catalogs, catalogTypes }: LookupStepProps) => {
  const [animationStep, setAnimationStep] = useState(0)

  const nextStep = () => {
    if (animationStep < 7) {
      setAnimationStep(animationStep + 1)
    }
  }

  const previousStep = () => {
    if (animationStep > 0) {
      setAnimationStep(animationStep - 1)
    }
  }

  const resetAnimation = () => {
    setAnimationStep(0)
  }

  // Step titles for user clarity
  const stepTitles = [
    "Iniciando...",
    "Viendo el código $lookup",
    "Explicando 'from': catalogtypes",
    "Explicando 'localField': nuestro campo",
    "Explicando 'foreignField': campo destino",
    "Explicando 'as': nueva columna que se crea",
    "Mostrando el proceso de matching",
    "¡Resultado final del JOIN!"
  ]

  return (
    <div className="lookup-step-container">
      <motion.h2 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="step-title"
      >
        <Link className="step-icon" />
        Paso 3: $lookup - JOIN con catalogtypes
      </motion.h2>

      {/* Manual Controls */}
      <motion.div 
        className="lookup-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button 
          className="lookup-btn" 
          onClick={previousStep} 
          disabled={animationStep === 0}
        >
          <ChevronLeft size={16} />
          Anterior
        </button>
        
        <div className="step-info">
          <span className="step-counter">{animationStep}/7</span>
          <span className="step-description">{stepTitles[animationStep]}</span>
        </div>
        
        <button 
          className="lookup-btn" 
          onClick={nextStep} 
          disabled={animationStep === 7}
        >
          Siguiente
          <ChevronRight size={16} />
        </button>
        
        <button className="lookup-btn reset-btn" onClick={resetAnimation}>
          <RotateCcw size={16} />
          Reiniciar
        </button>
      </motion.div>

      {/* Compact Layout - All visible at once */}
      <div className="lookup-compact-layout">
        
        {/* Left Column: $lookup Syntax */}
        <motion.div 
          className="lookup-syntax-compact"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>💻 Código $lookup</h3>
          <div className="code-content-compact">
            <div className="code-line">{"{"}</div>
            <div className="code-line">&nbsp;&nbsp;"$lookup": {"{"}</div>
            <div className={`code-line lookup-param ${animationStep === 2 ? 'highlight-param' : ''}`}>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="param-key">"from"</span>: <span className="param-value">"catalogtypes"</span>,
            </div>
            <div className={`code-line lookup-param ${animationStep === 3 ? 'highlight-param' : ''}`}>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="param-key">"localField"</span>: <span className="param-value">"id_catalog_type_obj"</span>,
            </div>
            <div className={`code-line lookup-param ${animationStep === 4 ? 'highlight-param' : ''}`}>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="param-key">"foreignField"</span>: <span className="param-value">"_id"</span>,
            </div>
            <div className={`code-line lookup-param ${animationStep === 5 ? 'highlight-param' : ''}`}>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="param-key">"as"</span>: <span className="param-value">"catalog_type"</span>
            </div>
            <div className="code-line">&nbsp;&nbsp;{"}"}</div>
            <div className="code-line">{"}"}</div>
          </div>

          {/* Parameter Explanations */}
          {animationStep >= 2 && (
            <motion.div 
              className="param-explanation-compact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {animationStep === 2 && (
                <div className="explanation-box">
                  <strong>"from":</strong> De qué colección traer datos<br/>
                  📚 Vamos a buscar en "catalogtypes"
                </div>
              )}
              {animationStep === 3 && (
                <div className="explanation-box">
                  <strong>"localField":</strong> Campo de nuestro documento<br/>
                  🔗 Usamos "id_catalog_type_obj" (ObjectId convertido)
                </div>
              )}
              {animationStep === 4 && (
                <div className="explanation-box">
                  <strong>"foreignField":</strong> Campo de la otra colección<br/>
                  🎯 Conectamos con "_id" de catalogtypes
                </div>
              )}
              {animationStep === 5 && (
                <div className="explanation-box">
                  <strong>"as":</strong> Nombre de la nueva columna que se crea<br/>
                  📋 Los datos encontrados se guardan en "catalog_type"<br/>
                  💡 Es como agregar una nueva columna a nuestro documento
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Visual Explanation */}
        <motion.div 
          className="lookup-visual-compact"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>👁️ Explicación Visual</h3>
          
          {animationStep >= 1 && (
            <div className="visual-content-compact">
              
              {/* Step 1-5: Show collections and matching */}
              {animationStep < 6 && (
                <div className="collections-comparison-compact">
                  <motion.div 
                    className="collection-compact left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h4>📦 catalogs (nosotros)</h4>
                    <div className="document-compact">
                      <div className={`field ${animationStep === 3 ? 'highlight-field' : ''}`}>
                        id_catalog_type_obj: "{catalogs[0].id_catalog_type}"
                      </div>
                      <div className="field">name: "{catalogs[0].name}"</div>
                    </div>
                  </motion.div>

                  {animationStep >= 4 && (
                    <motion.div 
                      className="connection-arrow-compact"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <div className="arrow-compact">🔗</div>
                      <div className="connection-text-compact">MATCH!</div>
                    </motion.div>
                  )}

                  {animationStep >= 2 && (
                    <motion.div 
                      className="collection-compact right"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h4>🏷️ catalogtypes (from)</h4>
                      <div className="document-compact">
                        <div className={`field ${animationStep === 4 ? 'highlight-field' : ''}`}>
                          _id: "{catalogTypes[0]._id}"
                        </div>
                        <div className="field">description: "{catalogTypes[0].description}"</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 6: Matching Process */}
              {animationStep === 6 && (
                <motion.div 
                  className="matching-process-compact"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <h4>🔍 Proceso de Matching</h4>
                  <div className="process-steps-compact">
                    <div className="process-step">1️⃣ Tomamos id_catalog_type_obj</div>
                    <div className="process-step">2️⃣ Buscamos en catalogtypes donde _id coincida</div>
                    <div className="process-step">3️⃣ Creamos nueva columna "catalog_type"</div>
                    <div className="process-step">4️⃣ Insertamos los datos encontrados en esa columna</div>
                  </div>
                  <div className="column-explanation">
                    <strong>💡 Resultado:</strong> Nuestro documento original + nueva columna "catalog_type" con los datos relacionados
                  </div>
                </motion.div>
              )}

              {/* Step 7: Final Result */}
              {animationStep === 7 && (
                <motion.div 
                  className="final-result-compact"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4>🎉 ¡Resultado del JOIN!</h4>
                  <div className="result-explanation">
                    <p><strong>📋 Documento original:</strong> _id, name, cost</p>
                    <p><strong>🆕 Nueva columna agregada:</strong> "catalog_type" (viene del JOIN)</p>
                  </div>
                  <div className="result-document-compact">
                    <pre>{JSON.stringify({
                      "_id": catalogs[0]._id,
                      "name": catalogs[0].name,
                      "cost": catalogs[0].cost,
                      "catalog_type": [{
                        "_id": catalogTypes[0]._id,
                        "description": catalogTypes[0].description,
                        "active": catalogTypes[0].active
                      }]
                    }, null, 2)}</pre>
                  </div>
                  <p className="success-message-compact">
                    ✅ ¡JOIN completado! Ahora tenemos la información completa en una nueva columna.
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
