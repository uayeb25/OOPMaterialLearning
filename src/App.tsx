import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { LookupStep } from './components/LookupStep'
import './App.css'

// Types for our MongoDB data
interface CatalogDocument {
  _id: string
  id_catalog_type: string
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

// Sample data
const sampleCatalogs: CatalogDocument[] = [
  {
    _id: "507f1f77bcf86cd799439011",
    id_catalog_type: "507f1f77bcf86cd799439001",
    name: "Bundle Chocolates Especiales",
    description: "Caja con chocolates premium",
    cost: 450.00,
    discount: 15,
    active: true
  },
  {
    _id: "507f1f77bcf86cd799439012",
    id_catalog_type: "507f1f77bcf86cd799439002",
    name: "Chocolate Individual",
    description: "Chocolate artesanal",
    cost: 25.00,
    discount: 0,
    active: true
  }
]

const sampleCatalogTypes: CatalogTypeDocument[] = [
  {
    _id: "507f1f77bcf86cd799439001",
    description: "bundle",
    active: true
  },
  {
    _id: "507f1f77bcf86cd799439002",
    description: "product",
    active: true
  }
]

// Sample bundle_details data
const sampleBundleDetails = [
  {
    _id: "507f1f77bcf86cd799439021",
    id_bundle: "507f1f77bcf86cd799439011",
    id_producto: "507f1f77bcf86cd799439031",
    quantity: 2
  },
  {
    _id: "507f1f77bcf86cd799439022", 
    id_bundle: "507f1f77bcf86cd799439011",
    id_producto: "507f1f77bcf86cd799439032",
    quantity: 1
  }
]

// Sample products for bundle details
const sampleProducts = [
  {
    _id: "507f1f77bcf86cd799439031",
    name: "Chocolate Premium",
    description: "Chocolate belga de alta calidad",
    cost: 150.00,
    active: true
  },
  {
    _id: "507f1f77bcf86cd799439032",
    name: "Dulce de Leche",
    description: "Dulce artesanal casero",
    cost: 75.00,
    active: true
  }
]

function App() {
  const [currentExercise, setCurrentExercise] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const exercises = {
    'bundle-validation': {
      title: 'Validación de Bundle',
      description: 'Pipeline para verificar que un documento es de tipo bundle',
      totalSlides: 9
    },
    'bundle-details': {
      title: 'Detalles de Bundle',
      description: 'Pipeline para obtener información completa de productos en un bundle',
      totalSlides: 8
    },
    'catalog-type-validation': {
      title: 'Validación de Tipo de Catálogo',
      description: 'Pipeline para validar tipos de catálogo con $match y $project',
      totalSlides: 6
    },
    'order-details': {
      title: 'Detalles de Orden',
      description: 'Pipeline avanzado para calcular subtotales y obtener información de productos en órdenes',
      totalSlides: 7
    }
  }

  const currentExerciseData = currentExercise ? exercises[currentExercise as keyof typeof exercises] : null
  const totalSlides = currentExerciseData?.totalSlides || 9

  const selectExercise = (exerciseKey: string) => {
    setCurrentExercise(exerciseKey)
    setCurrentSlide(0)
  }

  const backToMenu = () => {
    setCurrentExercise(null)
    setCurrentSlide(0)
  }

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const resetPresentation = () => {
    setCurrentSlide(0)
  }

  return (
    <div className="presentation-container">
      {!currentExercise ? (
        <ExerciseMenu exercises={exercises} onSelectExercise={selectExercise} />
      ) : (
        <>
          {/* Header */}
          <div className="header">
            <div className="header-left">
              <button className="btn back-btn" onClick={backToMenu}>
                <ChevronLeft size={20} />
                ← Volver al Menú
              </button>
              <h1 className="title">🍭 {currentExerciseData?.title}</h1>
            </div>
            <div className="slide-info">
              <span>{currentSlide + 1} / {totalSlides}</span>
            </div>
            <div className="controls">
              <button 
                className="btn" 
                onClick={previousSlide} 
                disabled={currentSlide === 0}
              >
                <ChevronLeft size={20} />
                Anterior
          </button>
          <button 
            className="btn" 
            onClick={nextSlide} 
            disabled={currentSlide === totalSlides - 1}
          >
            Siguiente
            <ChevronRight size={20} />
          </button>
          <button className="btn reset-btn" onClick={resetPresentation}>
            <RotateCcw size={20} />
            Reiniciar
          </button>
        </div>
      </div>

      {/* Slides Container */}
      <div className="slides-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="slide"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {currentExercise === 'bundle-validation' && (
              <>
                {currentSlide === 0 && <IntroSlide />}
                {currentSlide === 1 && <TraditionalVsAggregationSlide />}
                {currentSlide === 2 && <InitialDataSlide catalogs={sampleCatalogs} catalogTypes={sampleCatalogTypes} />}
                {currentSlide === 3 && <TargetResultSlide />}
                {currentSlide === 4 && <ConnectionDemoSlide />}
                {currentSlide === 5 && <MatchStepSlide />}
                {currentSlide === 6 && <AddFieldsStepSlide />}
                {currentSlide === 7 && <LookupStep catalogs={sampleCatalogs} catalogTypes={sampleCatalogTypes} />}
                {currentSlide === 8 && <FinalMatchStepSlide />}
              </>
            )}
            
            {currentExercise === 'bundle-details' && (
              <>
                {currentSlide === 0 && <BundleDetailsIntroSlide />}
                {currentSlide === 1 && <BundleDetailsDataSlide />}
                {currentSlide === 2 && <BundleDetailsMatchStepSlide />}
                {currentSlide === 3 && <BundleDetailsAddFieldsStepSlide />}
                {currentSlide === 4 && <BundleDetailsLookupStepSlide />}
                {currentSlide === 5 && <BundleDetailsUnwindStepSlide />}
                {currentSlide === 6 && <BundleDetailsProjectStepSlide />}
                {currentSlide === 7 && <BundleDetailsFinalResultSlide />}
              </>
            )}

            {currentExercise === 'catalog-type-validation' && (
              <>
                {currentSlide === 0 && <CatalogTypeIntroSlide />}
                {currentSlide === 1 && <CatalogTypeDataSlide />}
                {currentSlide === 2 && <CatalogTypeMatchStepSlide />}
                {currentSlide === 3 && <CatalogTypeProjectStepSlide />}
                {currentSlide === 4 && <CatalogTypeResultSlide />}
                {currentSlide === 5 && <CatalogTypeUsageSlide />}
              </>
            )}

            {currentExercise === 'order-details' && (
              <>
                {currentSlide === 0 && <OrderDetailsIntroSlide />}
                {currentSlide === 1 && <OrderDetailsDataSlide />}
                {currentSlide === 2 && <OrderDetailsMatchStepSlide />}
                {currentSlide === 3 && <OrderDetailsLookupStepSlide />}
                {currentSlide === 4 && <OrderDetailsAddFieldsStepSlide />}
                {currentSlide === 5 && <OrderDetailsCalculationSlide />}
                {currentSlide === 6 && <OrderDetailsFinalResultSlide />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="progress-container">
          <span>Progreso:</span>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill" 
              initial={{ width: "0%" }}
              animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span>{currentSlide + 1}/{totalSlides}</span>
        </div>
      </div>
      </>
      )}
    </div>
  )
}

// Exercise Menu Component
const ExerciseMenu = ({ exercises, onSelectExercise }: {
  exercises: Record<string, { title: string; description: string; totalSlides: number }>
  onSelectExercise: (key: string) => void
}) => (
  <div className="exercise-menu">
    <motion.div 
      className="menu-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="menu-title"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🍭 MongoDB Aggregation Pipeline - Dulcería
      </motion.h1>
      
      <motion.p 
        className="menu-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Selecciona un ejercicio para comenzar la presentación interactiva
      </motion.p>

      <div className="exercise-grid">
        {Object.entries(exercises).map(([key, exercise], index) => (
          <motion.button
            key={key}
            className="exercise-card"
            onClick={() => onSelectExercise(key)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="exercise-icon">
              {key === 'bundle-validation' ? '🔍' : '📦'}
            </div>
            <h3 className="exercise-title">{exercise.title}</h3>
            <p className="exercise-description">{exercise.description}</p>
            <div className="exercise-meta">
              <span className="slides-count">{exercise.totalSlides} slides</span>
              <span className="start-arrow">→</span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div 
        className="menu-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <p>💡 Aprende MongoDB Aggregation Pipeline de forma visual e interactiva</p>
      </motion.div>
    </motion.div>
  </div>
)

// Slide Components
const IntroSlide = () => (
  <div className="slide-content intro-slide">
    <motion.h2 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      Objetivo del Pipeline
    </motion.h2>
    <motion.p 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      Queremos encontrar un bundle específico en nuestra dulcería y confirmar que realmente es de tipo "bundle" (no un producto individual).
    </motion.p>
    
    <motion.div 
      className="explanation"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h3>¿Por qué necesitamos un pipeline?</h3>
      <p>Porque la información está distribuida en dos colecciones diferentes:</p>
      <ul>
        <li><strong>catalogs</strong> - Contiene los productos/bundles</li>
        <li><strong>catalogtypes</strong> - Define si es "bundle" o "product"</li>
      </ul>
    </motion.div>
  </div>
)

const TraditionalVsAggregationSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      🔍 Método Tradicional vs Aggregation Pipeline
    </motion.h2>

    <div className="comparison-layout">
      {/* Traditional Method */}
      <motion.div 
        className="traditional-method"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3>❌ Método Tradicional</h3>
        <div className="code-block-traditional">
          <div className="code-step">
            <h4>1️⃣ Buscar bundle por ID</h4>
            <pre>{`bundle_doc = catalogs_coll.find_one({
  "_id": ObjectId(bundle_id)
})

if not bundle_doc:
  raise HTTPException(404, "Bundle no encontrado")`}</pre>
          </div>
          
          <div className="code-step">
            <h4>2️⃣ Obtener ID del tipo</h4>
            <pre>{`catalog_type_id = bundle_doc.get("id_catalog_type")

if not catalog_type_id:
  raise HTTPException(409, "Sin tipo asociado")`}</pre>
          </div>
          
          <div className="code-step">
            <h4>3️⃣ Segunda consulta a BD</h4>
            <pre>{`catalog_type_doc = catalogtypes_coll.find_one({
  "_id": ObjectId(catalog_type_id)
})

if not catalog_type_doc:
  raise HTTPException(404, "Tipo no existe")`}</pre>
          </div>

          <div className="code-step">
            <h4>4️⃣ Validar tipo</h4>
            <pre>{`description = catalog_type_doc.get("description", "")
if description.lower() != "bundle":
  raise HTTPException(400, "No es tipo bundle")`}</pre>
          </div>
        </div>

        <motion.div 
          className="problems-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <h4>⚠️ Problemas:</h4>
          <ul>
            <li>🐌 <strong>Múltiples consultas</strong> a la base de datos</li>
            <li>📝 <strong>Código largo</strong> y difícil de mantener</li>
            <li>🔧 <strong>Manejo manual</strong> de errores en cada paso</li>
            <li>⚡ <strong>Ineficiente</strong> para grandes volúmenes</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* VS Divider */}
      <motion.div 
        className="vs-divider"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <div className="vs-circle">VS</div>
      </motion.div>

      {/* Aggregation Method */}
      <motion.div 
        className="aggregation-method"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3>✅ Aggregation Pipeline</h3>
        <div className="code-block-aggregation">
          <pre>{`db.catalogs.aggregate([
  {
    $match: { 
      "_id": ObjectId(bundle_id) 
    }
  },
  {
    $addFields: {
      "id_catalog_type_obj": {
        $toObjectId: "$id_catalog_type"
      }
    }
  },
  {
    $lookup: {
      from: "catalogtypes",
      localField: "id_catalog_type_obj",
      foreignField: "_id",
      as: "catalog_type"
    }
  },
  {
    $match: {
      "catalog_type.description": {
        $regex: "^bundle$", $options: "i"
      }
    }
  }
])`}</pre>
        </div>

        <motion.div 
          className="benefits-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h4>🎉 Beneficios:</h4>
          <ul>
            <li>⚡ <strong>Una sola consulta</strong> a la base de datos</li>
            <li>🎯 <strong>Código conciso</strong> y fácil de leer</li>
            <li>🔄 <strong>Pipeline optimizado</strong> por MongoDB</li>
            <li>🚀 <strong>Mejor rendimiento</strong> y escalabilidad</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  </div>
)

const InitialDataSlide = ({ catalogs, catalogTypes }: { catalogs: CatalogDocument[], catalogTypes: CatalogTypeDocument[] }) => (
  <div className="slide-content">
    <h2>Estado Inicial - Nuestras Colecciones</h2>
    <div className="collections-container">
      <motion.div 
        className="collection"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3>📦 Colección: catalogs</h3>
        {catalogs.map((doc, index) => (
          <motion.div 
            key={doc._id}
            className="document"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.2 }}
          >
            <pre>{JSON.stringify(doc, null, 2)}</pre>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="collection"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3>🏷️ Colección: catalogtypes</h3>
        {catalogTypes.map((doc, index) => (
          <motion.div 
            key={doc._id}
            className="document"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.2 }}
          >
            <pre>{JSON.stringify(doc, null, 2)}</pre>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
)

// Placeholder components for other slides
const TargetResultSlide = () => (
  <div className="slide-content">
    <h2>🎯 Resultado Esperado</h2>
    <div className="explanation">
      Este es el resultado que esperamos obtener al final de nuestro pipeline
    </div>

    <motion.div 
      className="result-container"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
    >
      <h3>🎉 ¡Resultado Final!</h3>
      <div className="document joined" style={{ textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
        <pre>{JSON.stringify({
          "_id": "507f1f77bcf86cd799439011",
          "name": "Bundle Chocolates Especiales", 
          "description": "Caja con chocolates premium",
          "cost": 450.00,
          "discount": 15,
          "active": true,
          "catalog_type": [{
            "_id": "507f1f77bcf86cd799439001",
            "description": "bundle",
            "active": true
          }]
        }, null, 2)}</pre>
      </div>
      <motion.p 
        style={{ marginTop: '20px', fontSize: '1.2em' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        ✅ <strong>Confirmado:</strong> Es un bundle válido con toda la información completa
      </motion.p>
    </motion.div>

    <div className="explanation">
      <strong>Nota clave:</strong> El documento final incluye la información completa del bundle 
      MÁS la confirmación de que es realmente de tipo "bundle" (no product).
    </div>
  </div>
)

const ConnectionDemoSlide = () => (
  <div className="slide-content">
    <h2>🔗 Demostración Visual - Conexión de Datos</h2>
    
    <div className="explanation">
      <strong>¿Cómo se conectan nuestros datos?</strong><br/>
      Veamos visualmente cómo se relacionan las colecciones para obtener la información completa.
    </div>

    <motion.div 
      className="connection-demo"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="collections-container">
        <motion.div 
          className="collection"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>📦 catalogs</h3>
          <div className="document">
            <div className="highlight-field">id_catalog_type: "507f1f77bcf86cd799439001"</div>
            <div>name: "Bundle Chocolates Especiales"</div>
            <div>cost: 450.00</div>
          </div>
        </motion.div>

        <motion.div 
          className="connection-arrow-demo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <div className="arrow">➡️</div>
          <div className="connection-text">Se conecta por ID</div>
        </motion.div>

        <motion.div 
          className="collection"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3>🏷️ catalogtypes</h3>
          <div className="document">
            <div className="highlight-field">_id: "507f1f77bcf86cd799439001"</div>
            <div>description: "bundle"</div>
            <div>active: true</div>
          </div>
        </motion.div>
      </div>
    </motion.div>

    <motion.div 
      className="explanation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      💡 <strong>El pipeline nos ayuda a "pegar" esta información</strong> para obtener un documento 
      completo que confirme que nuestro bundle es realmente de tipo "bundle".
    </motion.div>
  </div>
)

const MatchStepSlide = () => (
  <div className="slide-content">
    <h2>🔍 Paso 1: $match - Buscar Bundle Específico</h2>

    <motion.div 
      className="code-block"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <pre>{JSON.stringify({"$match": {"_id": "ObjectId('507f1f77bcf86cd799439011')"}}, null, 2)}</pre>
    </motion.div>

    <div className="explanation">
      Filtramos la colección catalogs para encontrar solo el bundle con ID específico
    </div>

    <div className="comparison-container">
      <motion.div 
        className="current-state"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="state-title">📊 Estamos aquí (Input)</div>
        <div className="document">
          Múltiples documentos en catalogs:<br/>
          • Bundle Chocolates Especiales<br/>
          • Chocolate Individual<br/>
          • Bundle Dulces Tradicionales
        </div>
      </motion.div>

      <motion.div 
        className="vs-divider"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      >
        ⬇️
      </motion.div>

      <motion.div 
        className="next-state"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="state-title">🎯 Resultado (Output)</div>
        <div className="document filtered">
          <pre>{JSON.stringify({
            "_id": "507f1f77bcf86cd799439011",
            "id_catalog_type": "507f1f77bcf86cd799439001",
            "name": "Bundle Chocolates Especiales",
            "description": "Caja con chocolates premium",
            "cost": 450.00,
            "discount": 15,
            "active": true
          }, null, 2)}</pre>
        </div>
      </motion.div>
    </div>
  </div>
)

const AddFieldsStepSlide = () => (
  <div className="slide-content">
    <h2>🔧 Paso 2: $addFields - Convertir ID a ObjectId</h2>

    <motion.div 
      className="code-block"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <pre>{JSON.stringify({
        "$addFields": {
          "id_catalog_type_obj": {"$toObjectId": "$id_catalog_type"}
        }
      }, null, 2)}</pre>
    </motion.div>

    <div className="explanation">
      Convertimos el campo id_catalog_type (string) a ObjectId para poder hacer el JOIN
    </div>

    <div className="comparison-container">
      <motion.div 
        className="current-state"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="state-title">📊 Estamos aquí (Input)</div>
        <div className="document">
          <pre>{JSON.stringify({
            "_id": "507f1f77bcf86cd799439011",
            "id_catalog_type": "507f1f77bcf86cd799439001",
            "name": "Bundle Chocolates Especiales"
          }, null, 2)}</pre>
        </div>
      </motion.div>

      <motion.div 
        className="vs-divider"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      >
        ⬇️
      </motion.div>

      <motion.div 
        className="next-state"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="state-title">🎯 Resultado (Output)</div>
        <div className="document joined">
          <pre>{JSON.stringify({
            "_id": "507f1f77bcf86cd799439011",
            "id_catalog_type": "507f1f77bcf86cd799439001",
            "id_catalog_type_obj": "ObjectId('507f1f77bcf86cd799439001')",
            "name": "Bundle Chocolates Especiales"
          }, null, 2)}</pre>
          <div className="highlight-field" style={{marginTop: '10px'}}>
            ⬆️ Nuevo campo agregado
          </div>
        </div>
      </motion.div>
    </div>

    <motion.div 
      className="explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <strong>¿Por qué este paso?</strong> MongoDB necesita que los campos sean del mismo tipo para hacer JOIN. 
      El _id en catalogtypes es ObjectId, pero id_catalog_type es string.
    </motion.div>
  </div>
)

const FinalMatchStepSlide = () => (
  <div className="slide-content">
    <h2>✅ Paso 4: $match Final - Verificar que es Bundle</h2>

    <motion.div 
      className="code-block"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <pre>{JSON.stringify({
        "$match": {
          "catalog_type.description": {"$regex": "^bundle$", "$options": "i"}
        }
      }, null, 2)}</pre>
    </motion.div>

    <div className="explanation">
      Verificamos que el tipo sea exactamente "bundle" (ignora mayúsculas/minúsculas)
    </div>

    <div className="comparison-container">
      <motion.div 
        className="current-state"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="state-title">📊 Estamos aquí (Input)</div>
        <div className="document">
          Documento con catalog_type array que puede contener:<br/>
          • "bundle" ✅<br/>
          • "product" ❌<br/>
          • otros tipos ❌
        </div>
      </motion.div>

      <motion.div 
        className="vs-divider"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      >
        ✅
      </motion.div>

      <motion.div 
        className="next-state"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="state-title">🎯 Resultado Final</div>
        <div className="result-container">
          <motion.h3
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            🎉 ¡Pipeline Completado!
          </motion.h3>
          <div className="document joined" style={{textAlign: 'left', maxWidth: '500px', margin: '20px auto'}}>
            <pre>{JSON.stringify({
              "_id": "507f1f77bcf86cd799439011",
              "name": "Bundle Chocolates Especiales",
              "cost": 450.00,
              "catalog_type": [{"description": "bundle"}]
            }, null, 2)}</pre>
          </div>
          <motion.p 
            style={{marginTop: '15px', fontSize: '1.1em'}}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            ✅ <strong>Confirmado:</strong> Es un bundle válido
          </motion.p>
        </div>
      </motion.div>
    </div>

    <motion.div 
      className="explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
    >
      <strong>Misión cumplida:</strong> Hemos encontrado y verificado que el producto específico es realmente un bundle, 
      no un producto individual. ¡Pipeline exitoso! 🎊
    </motion.div>
  </div>
)

// Bundle Details Exercise Components
const BundleDetailsIntroSlide = () => (
  <div className="slide-content intro-slide">
    <motion.h2 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      📦 Objetivo: Obtener Detalles del Bundle
    </motion.h2>
    
    <motion.p 
      className="intro-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      Queremos obtener información completa de todos los productos que forman parte de un bundle específico, 
      incluyendo nombres, descripciones, costos y cantidades.
    </motion.p>
    
    <motion.div 
      className="explanation"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h3>Pipeline a construir:</h3>
      <ul>
        <li><strong>$match</strong> - Filtrar por bundle específico</li>
        <li><strong>$addFields</strong> - Convertir id_producto a ObjectId</li>
        <li><strong>$lookup</strong> - JOIN con colección catalogs</li>
        <li><strong>$unwind</strong> - Descomponer array de productos</li>
        <li><strong>$project</strong> - Formato final de salida</li>
      </ul>
    </motion.div>
  </div>
)

const BundleDetailsDataSlide = () => (
  <div className="slide-content">
    <h2>Datos Iniciales - bundle_details y catalogs</h2>
    
    <div className="collections-container">
      <motion.div 
        className="collection-card"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3>📋 bundle_details (Detalles)</h3>
        <div className="documents-grid">
          {sampleBundleDetails.map((detail, index) => (
            <div key={index} className="document">
              <div className="field"><strong>_id:</strong> {detail._id}</div>
              <div className="field"><strong>id_bundle:</strong> {detail.id_bundle}</div>
              <div className="field"><strong>id_producto:</strong> {detail.id_producto}</div>
              <div className="field"><strong>quantity:</strong> {detail.quantity}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="collection-card"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3>🛍️ catalogs (Productos)</h3>
        <div className="documents-grid">
          {sampleProducts.map((product, index) => (
            <div key={index} className="document">
              <div className="field"><strong>_id:</strong> {product._id}</div>
              <div className="field"><strong>name:</strong> {product.name}</div>
              <div className="field"><strong>description:</strong> {product.description}</div>
              <div className="field"><strong>cost:</strong> ${product.cost}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
)

const BundleDetailsMatchStepSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🎯 Paso 1: $match - Filtrar por Bundle
    </motion.h2>

    <motion.div 
      className="step-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <p>Filtramos todos los detalles que pertenecen al bundle específico</p>
    </motion.div>

    <motion.div 
      className="code-section"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>💻 Código:</h3>
      <div className="code-block">
        <pre>{`{
  "$match": {
    "id_bundle": "507f1f77bcf86cd799439011"
  }
}`}</pre>
      </div>
    </motion.div>

    <motion.div 
      className="result-preview"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3>📤 Resultado:</h3>
      <div className="result-documents">
        {sampleBundleDetails.map((detail, index) => (
          <div key={index} className="result-doc">
            <div className="field">_id: {detail._id}</div>
            <div className="field highlight">id_bundle: {detail.id_bundle}</div>
            <div className="field">id_producto: {detail.id_producto}</div>
            <div className="field">quantity: {detail.quantity}</div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
)

const BundleDetailsAddFieldsStepSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🔧 Paso 2: $addFields - Convertir a ObjectId
    </motion.h2>

    <motion.div 
      className="step-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <p>Convertimos el campo id_producto (string) a ObjectId para poder hacer el JOIN</p>
    </motion.div>

    <motion.div 
      className="code-section"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>💻 Código:</h3>
      <div className="code-block">
        <pre>{`{
  "$addFields": {
    "id_producto_obj": {
      "$toObjectId": "$id_producto"
    }
  }
}`}</pre>
      </div>
    </motion.div>

    <motion.div 
      className="transformation-demo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <h3>🔄 Transformación:</h3>
      <div className="transformation-container">
        <div className="before">
          <h4>📋 Antes:</h4>
          <div className="field">id_producto: "507f1f77bcf86cd799439031"</div>
        </div>
        <div className="arrow">→</div>
        <div className="after">
          <h4>✅ Después:</h4>
          <div className="field">id_producto: "507f1f77bcf86cd799439031"</div>
          <div className="field new-field">id_producto_obj: ObjectId("507f1f77bcf86cd799439031")</div>
        </div>
      </div>
    </motion.div>
  </div>
)

const BundleDetailsLookupStepSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🔗 Paso 3: $lookup - JOIN con catalogs
    </motion.h2>

    <motion.div 
      className="step-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <p>Hacemos JOIN con la colección catalogs para obtener información del producto</p>
    </motion.div>

    <motion.div 
      className="code-section"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>💻 Código:</h3>
      <div className="code-block">
        <pre>{`{
  "$lookup": {
    "from": "catalogs",
    "localField": "id_producto_obj",
    "foreignField": "_id",
    "as": "product_info"
  }
}`}</pre>
      </div>
    </motion.div>

    <motion.div 
      className="lookup-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="lookup-params">
        <div className="param">
          <strong>from:</strong> "catalogs" - Colección de productos
        </div>
        <div className="param">
          <strong>localField:</strong> "id_producto_obj" - Nuestro campo ObjectId
        </div>
        <div className="param">
          <strong>foreignField:</strong> "_id" - Campo _id de catalogs
        </div>
        <div className="param">
          <strong>as:</strong> "product_info" - Nueva columna con datos del producto
        </div>
      </div>
    </motion.div>
  </div>
)

const BundleDetailsUnwindStepSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      📤 Paso 4: $unwind - Descomponer Array
    </motion.h2>

    <motion.div 
      className="step-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <p>$lookup devuelve un array. Usamos $unwind para convertir cada elemento del array en un documento separado</p>
    </motion.div>

    <motion.div 
      className="code-section"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>💻 Código:</h3>
      <div className="code-block">
        <pre>{`{
  "$unwind": "$product_info"
}`}</pre>
      </div>
    </motion.div>

    <motion.div 
      className="unwind-demo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <h3>🔄 Efecto del $unwind:</h3>
      <div className="unwind-container">
        <div className="before-unwind">
          <h4>📋 Antes (con array):</h4>
          <div className="document">
            <div className="field">_id: "507f1f77bcf86cd799439021"</div>
            <div className="field">quantity: 2</div>
            <div className="field array-field">
              product_info: [
              <div className="array-item">
                {"{"} _id: "507f1f77bcf86cd799439031", name: "Chocolate Premium" {"}"}
              </div>
              ]
            </div>
          </div>
        </div>
        
        <div className="arrow">→</div>
        
        <div className="after-unwind">
          <h4>✅ Después (sin array):</h4>
          <div className="document">
            <div className="field">_id: "507f1f77bcf86cd799439021"</div>
            <div className="field">quantity: 2</div>
            <div className="field object-field">
              product_info: {"{"} _id: "507f1f77bcf86cd799439031", name: "Chocolate Premium" {"}"}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
)

const BundleDetailsProjectStepSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🎨 Paso 5: $project - Formato de Salida
    </motion.h2>

    <motion.div 
      className="step-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <p>Definimos exactamente qué campos queremos en el resultado final y cómo deben llamarse</p>
    </motion.div>

    <motion.div 
      className="code-section"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>💻 Código:</h3>
      <div className="code-block">
        <pre>{`{
  "$project": {
    "_id": 0,
    "bundle_detail_id": {"$toString": "$_id"},
    "id_producto": {"$toString": "$id_producto"},
    "quantity": "$quantity",
    "product_name": "$product_info.name",
    "product_description": "$product_info.description",
    "product_cost": "$product_info.cost",
    "product_active": "$product_info.active"
  }
}`}</pre>
      </div>
    </motion.div>

    <motion.div 
      className="project-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3>🔍 Explicación de campos:</h3>
      <div className="project-fields">
        <div className="field-explanation">
          <strong>"_id": 0</strong> - Excluir el _id original
        </div>
        <div className="field-explanation">
          <strong>"bundle_detail_id"</strong> - Convertir _id a string
        </div>
        <div className="field-explanation">
          <strong>"product_name"</strong> - Extraer nombre del producto del JOIN
        </div>
        <div className="field-explanation">
          <strong>"product_cost"</strong> - Extraer costo del producto del JOIN
        </div>
      </div>
    </motion.div>
  </div>
)

const BundleDetailsFinalResultSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🎉 Resultado Final - Detalles Completos del Bundle
    </motion.h2>

    <motion.div 
      className="pipeline-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3>📋 Pipeline Completo Ejecutado:</h3>
      <div className="pipeline-steps">
        <div className="step">1️⃣ $match → Filtrar por bundle</div>
        <div className="step">2️⃣ $addFields → Convertir a ObjectId</div>
        <div className="step">3️⃣ $lookup → JOIN con productos</div>
        <div className="step">4️⃣ $unwind → Descomponer array</div>
        <div className="step">5️⃣ $project → Formato final</div>
      </div>
    </motion.div>

    <motion.div 
      className="final-result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>✨ Resultado:</h3>
      <div className="result-documents">
        <div className="result-doc success">
          <div className="field">bundle_detail_id: "507f1f77bcf86cd799439021"</div>
          <div className="field">id_producto: "507f1f77bcf86cd799439031"</div>
          <div className="field">quantity: 2</div>
          <div className="field highlight">product_name: "Chocolate Premium"</div>
          <div className="field highlight">product_description: "Chocolate belga de alta calidad"</div>
          <div className="field highlight">product_cost: 150.00</div>
          <div className="field">product_active: true</div>
        </div>
        
        <div className="result-doc success">
          <div className="field">bundle_detail_id: "507f1f77bcf86cd799439022"</div>
          <div className="field">id_producto: "507f1f77bcf86cd799439032"</div>
          <div className="field">quantity: 1</div>
          <div className="field highlight">product_name: "Dulce de Leche"</div>
          <div className="field highlight">product_description: "Dulce artesanal casero"</div>
          <div className="field highlight">product_cost: 75.00</div>
          <div className="field">product_active: true</div>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="success-message"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <p>🎯 ¡Perfecto! Ahora tenemos toda la información de los productos del bundle en un formato claro y estructurado.</p>
    </motion.div>
  </div>
)

// ======================================
// CATALOG TYPE VALIDATION SLIDES
// ======================================

const CatalogTypeIntroSlide = () => (
  <div className="slide-content">
    <motion.h1 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      🔍 Validación de Tipo de Catálogo
    </motion.h1>
    
    <motion.div 
      className="intro-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <h2>🎯 Objetivo del Pipeline</h2>
      <p>Validar que un tipo de catálogo existe y está activo usando operaciones básicas de MongoDB Aggregation.</p>
      
      <div className="pipeline-preview">
        <h3>📝 Pipeline a Implementar:</h3>
        <div className="code-block">
          <span className="comment"># Pipeline para validar catalog_type</span><br/>
          <span className="bracket">[</span><br/>
          <span className="indent">{`{"$match": {"_id": "ObjectId", "active": true}}`}</span><br/>
          <span className="indent">{`{"$project": {"id": {"$toString": "$_id"}, "description": 1, "active": 1}}`}</span><br/>
          <span className="bracket">]</span>
        </div>
      </div>

      <div className="use-case">
        <h3>🏪 Caso de Uso Real:</h3>
        <p>Antes de crear un nuevo catálogo, necesitamos validar que el tipo de catálogo al que pertenece existe y está activo.</p>
      </div>
    </motion.div>
  </div>
)

const CatalogTypeDataSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      📊 Datos de Entrada - Colección "catalogtypes"
    </motion.h2>

    <motion.div 
      className="collections-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="collection">
        <h3>📁 catalogtypes Collection</h3>
        <div className="documents">
          <div className="document">
            <div className="doc-header">Document 1</div>
            <div className="field">_id: ObjectId("507f1f77bcf86cd799439001")</div>
            <div className="field">description: "bundle"</div>
            <div className="field success">active: true</div>
          </div>
          
          <div className="document">
            <div className="doc-header">Document 2</div>
            <div className="field">_id: ObjectId("507f1f77bcf86cd799439002")</div>
            <div className="field">description: "product"</div>
            <div className="field success">active: true</div>
          </div>

          <div className="document">
            <div className="doc-header">Document 3</div>
            <div className="field">_id: ObjectId("507f1f77bcf86cd799439003")</div>
            <div className="field">description: "service"</div>
            <div className="field error">active: false</div>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="input-info"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3>🔍 Parámetro de Entrada:</h3>
      <div className="input-example">
        <strong>catalog_type_id:</strong> "507f1f77bcf86cd799439001"
      </div>
      <p>Queremos validar que este ID corresponde a un tipo de catálogo activo.</p>
    </motion.div>
  </div>
)

const CatalogTypeMatchStepSlide = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const documents = [
    {
      id: "507f1f77bcf86cd799439001",
      description: "bundle",
      active: true,
      matches: true
    },
    {
      id: "507f1f77bcf86cd799439002", 
      description: "product",
      active: true,
      matches: false
    },
    {
      id: "507f1f77bcf86cd799439003",
      description: "service", 
      active: false,
      matches: false
    }
  ]

  const targetId = "507f1f77bcf86cd799439001"

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= documents.length) {
          clearInterval(interval)
          setIsAnimating(false)
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  const resetAnimation = () => {
    setCurrentStep(0)
    setIsAnimating(false)
  }

  return (
    <div className="slide-content">
      <motion.h2 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        🎯 Paso 1: $match - Filtrar Documento
      </motion.h2>

      <motion.div 
        className="step-explanation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3>🔍 ¿Qué hace $match?</h3>
        <p>Recorre cada documento y evalúa si cumple TODOS los criterios especificados.</p>
        
        <div className="operation-demo">
          <h4>📝 Criterios de Filtrado:</h4>
          <div className="criteria-box">
            <div className="criterion">
              <span className="criterion-label">ID específico:</span>
              <span className="criterion-value">ObjectId("{targetId}")</span>
            </div>
            <div className="criterion">
              <span className="criterion-label">Estado activo:</span>
              <span className="criterion-value">true</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="animated-filter-demo"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="animation-controls">
          <button 
            className="btn btn-primary" 
            onClick={startAnimation}
            disabled={isAnimating}
          >
            {isAnimating ? "🔄 Procesando..." : "▶️ Iniciar Evaluación"}
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={resetAnimation}
            disabled={isAnimating}
          >
            🔄 Reiniciar
          </button>
        </div>

        <div className="evaluation-process">
          <h3>🔄 Proceso de Evaluación:</h3>
          
          <div className="documents-evaluation">
            {documents.map((doc, index) => (
              <motion.div 
                key={index}
                className={`document-eval ${
                  currentStep > index ? (doc.matches ? 'matched' : 'rejected') : 
                  currentStep === index ? 'evaluating' : 'pending'
                }`}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ 
                  opacity: currentStep >= index ? 1 : 0.5,
                  scale: currentStep === index ? 1.05 : 1,
                  border: currentStep === index ? '3px solid #ffd700' : '1px solid #ddd'
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="doc-header">
                  <span className="doc-title">Documento {index + 1}</span>
                  {currentStep > index && (
                    <span className={`result-icon ${doc.matches ? 'success' : 'error'}`}>
                      {doc.matches ? '✅' : '❌'}
                    </span>
                  )}
                  {currentStep === index && (
                    <span className="evaluating-icon">🔍</span>
                  )}
                </div>
                
                <div className="doc-content">
                  <div className="field">
                    <span className="field-label">_id:</span>
                    <span className={`field-value ${
                      currentStep > index ? 
                        (doc.id === targetId ? 'match' : 'no-match') : ''
                    }`}>
                      ...{doc.id.slice(-6)}
                    </span>
                    {currentStep > index && (
                      <span className="eval-result">
                        {doc.id === targetId ? '✓' : '✗'}
                      </span>
                    )}
                  </div>
                  
                  <div className="field">
                    <span className="field-label">active:</span>
                    <span className={`field-value ${
                      currentStep > index ? 
                        (doc.active ? 'match' : 'no-match') : ''
                    }`}>
                      {doc.active.toString()}
                    </span>
                    {currentStep > index && (
                      <span className="eval-result">
                        {doc.active ? '✓' : '✗'}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <span className="field-label">description:</span>
                    <span className="field-value">"{doc.description}"</span>
                  </div>
                </div>

                {currentStep > index && (
                  <motion.div 
                    className="evaluation-summary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className={`eval-verdict ${doc.matches ? 'pass' : 'fail'}`}>
                      {doc.matches ? 
                        '🎯 PASA el filtro - Ambos criterios cumplen' : 
                        '🚫 NO pasa el filtro - Al menos un criterio falla'
                      }
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {currentStep > documents.length && (
            <motion.div 
              className="final-result-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4>� Resultado Final del $match:</h4>
              <div className="final-match-result">
                <div className="matched-docs">
                  <strong>✅ Documentos que PASARON:</strong> 1
                  <div className="matched-doc">
                    _id: ...439001, description: "bundle", active: true
                  </div>
                </div>
                <div className="rejected-docs">
                  <strong>❌ Documentos RECHAZADOS:</strong> 2
                  <div className="reason">• Documento 2: ID diferente</div>
                  <div className="reason">• Documento 3: ID diferente</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

const CatalogTypeProjectStepSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🎨 Paso 2: $project - Dar Formato a la Salida
    </motion.h2>

    <motion.div 
      className="step-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3>🎯 ¿Qué hace $project?</h3>
      <p>Reformatea los documentos seleccionando campos específicos y aplicando transformaciones.</p>
      
      <div className="operation-demo">
        <h4>📝 Operación:</h4>
        <div className="code-block">
          <span className="bracket">{`{`}</span><br/>
          <span className="indent">{`"$project": {`}</span><br/>
          <span className="indent2">{`"id": {"$toString": "$_id"},`}</span><br/>
          <span className="indent2">{`"description": "$description",`}</span><br/>
          <span className="indent2">{`"active": "$active"`}</span><br/>
          <span className="indent">{`}`}</span><br/>
          <span className="bracket">{`}`}</span>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="transformation-demo"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>🔄 Transformación de Datos:</h3>
      
      <div className="transformation-process">
        <div className="input-format">
          <h4>📥 Documento del $match:</h4>
          <div className="doc-structure">
            <div className="field">_id: ObjectId("507f1f77bcf86cd799439001")</div>
            <div className="field">description: "bundle"</div>
            <div className="field">active: true</div>
          </div>
        </div>

        <div className="arrow">→</div>

        <div className="output-format">
          <h4>📤 Resultado del $project:</h4>
          <div className="doc-structure">
            <div className="field transformed">id: "507f1f77bcf86cd799439001" ← String</div>
            <div className="field">description: "bundle"</div>
            <div className="field">active: true</div>
          </div>
        </div>
      </div>

      <div className="transformation-benefits">
        <h4>✨ Beneficios de la Transformación:</h4>
        <ul>
          <li>🔄 <strong>$toString</strong>: Convierte ObjectId a String para mejor compatibilidad</li>
          <li>🎯 <strong>Campos específicos</strong>: Solo incluye los datos necesarios</li>
          <li>📋 <strong>Formato consistente</strong>: Estructura predecible para el cliente</li>
        </ul>
      </div>
    </motion.div>
  </div>
)

const CatalogTypeResultSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      ✅ Resultado Final del Pipeline
    </motion.h2>

    <motion.div 
      className="pipeline-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3>📋 Pipeline Ejecutado:</h3>
      <div className="pipeline-steps">
        <div className="step completed">1️⃣ $match → Filtrar por ID y activo</div>
        <div className="step completed">2️⃣ $project → Formatear salida</div>
      </div>
    </motion.div>

    <motion.div 
      className="result-scenarios"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>🎯 Posibles Resultados:</h3>
      
      <div className="scenario success">
        <h4>✅ Caso Exitoso:</h4>
        <div className="result-doc">
          <div className="field">id: "507f1f77bcf86cd799439001"</div>
          <div className="field">description: "bundle"</div>
          <div className="field">active: true</div>
        </div>
        <p><strong>Significado:</strong> El tipo de catálogo existe y está activo ✨</p>
      </div>

      <div className="scenario error">
        <h4>❌ Caso de Error:</h4>
        <div className="result-doc empty">
          <div className="field">[] ← Array vacío</div>
        </div>
        <p><strong>Significado:</strong> El tipo de catálogo no existe o está inactivo ⚠️</p>
      </div>
    </motion.div>

    <motion.div 
      className="validation-logic"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3>🔍 Lógica de Validación:</h3>
      <div className="code-block">
        <span className="comment"># En Python:</span><br/>
        <span>catalog_type_result = list(catalog_types_coll.aggregate(pipeline))</span><br/>
        <span className="keyword">if</span> catalog_type_result:<br/>
        <span className="indent"># ✅ Tipo de catálogo válido</span><br/>
        <span className="keyword">else</span>:<br/>
        <span className="indent"># ❌ Tipo de catálogo inválido</span>
      </div>
    </motion.div>
  </div>
)

const CatalogTypeUsageSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🏗️ Uso en el Modelo Catalog
    </motion.h2>

    <motion.div 
      className="usage-context"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3>📋 Contexto del Modelo:</h3>
      <div className="model-info">
        <div className="model-field">
          <strong>Campo:</strong> id_catalog_type: str
        </div>
        <div className="model-field">
          <strong>Descripción:</strong> "ID del tipo de catálogo al que pertenece"
        </div>
        <div className="model-field">
          <strong>Ejemplo:</strong> "507f1f77bcf86cd799439011"
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="usage-flow"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>🔄 Flujo de Validación:</h3>
      
      <div className="flow-steps">
        <div className="flow-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h4>📥 Cliente envía Catalog</h4>
            <p>Incluye id_catalog_type</p>
          </div>
        </div>

        <div className="flow-arrow">↓</div>

        <div className="flow-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h4>🔍 Validar catalog_type</h4>
            <p>Pipeline de aggregation</p>
          </div>
        </div>

        <div className="flow-arrow">↓</div>

        <div className="flow-step decision">
          <div className="step-number">3</div>
          <div className="step-content">
            <h4>⚖️ Decisión</h4>
            <div className="decision-paths">
              <div className="path success">✅ Válido → Crear Catalog</div>
              <div className="path error">❌ Inválido → Error 400</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="implementation-code"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3>💻 Implementación Real:</h3>
      <div className="code-block">
        <span className="comment"># Validar que el catalog_type existe y está activo</span><br/>
        <span>catalog_type_pipeline = validate_catalog_type_pipeline(catalog.id_catalog_type)</span><br/>
        <span>catalog_type_result = list(catalog_types_coll.aggregate(catalog_type_pipeline))</span><br/>
        <br/>
        <span className="keyword">if not</span> catalog_type_result:<br/>
        <span className="indent">raise HTTPException(status_code=400, detail="Invalid catalog type")</span>
      </div>
    </motion.div>

    <motion.div 
      className="success-message"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <p>🎯 ¡Pipeline simple pero poderoso para validaciones críticas en el sistema!</p>
    </motion.div>
  </div>
)

// ======================================
// ORDER DETAILS SLIDES
// ======================================

const OrderDetailsIntroSlide = () => (
  <div className="slide-content">
    <motion.h1 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      🛒 Detalles de Orden con Cálculos
    </motion.h1>
    
    <motion.div 
      className="intro-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <h2>🎯 Objetivo del Pipeline</h2>
      <p>Obtener detalles completos de una orden incluyendo información de productos y cálculo automático de subtotales por línea.</p>
      
      <div className="pipeline-preview">
        <h3>📝 Pipeline Avanzado:</h3>
        <div className="code-block">
          <span className="comment"># Pipeline para detalles de orden con cálculos</span><br/>
          <span className="bracket">[</span><br/>
          <span className="indent">{`{"$match": {"id_order": "ORD-001", "active": true}}`}</span><br/>
          <span className="indent">{`{"$lookup": {...}} # JOIN con productos`}</span><br/>
          <span className="indent">{`{"$addFields": {...}} # Cálculos de subtotales`}</span><br/>
          <span className="bracket">]</span>
        </div>
      </div>

      <div className="use-case">
        <h3>💼 Caso de Uso Real:</h3>
        <p>Sistema de e-commerce que necesita mostrar el detalle completo de una orden con precios actualizados y subtotales calculados automáticamente.</p>
      </div>
    </motion.div>
  </div>
)

const OrderDetailsDataSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      📊 Datos de Entrada - Colecciones Relacionadas
    </motion.h2>

    <motion.div 
      className="collections-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="collection">
        <h3>📁 order_details Collection</h3>
        <div className="documents">
          <div className="document">
            <div className="doc-header">Línea 1 - ORD-001</div>
            <div className="field">_id: ObjectId("...439051")</div>
            <div className="field highlight">id_order: "ORD-001"</div>
            <div className="field">id_producto: "507f1f77bcf86cd799439031"</div>
            <div className="field">quantity: 3</div>
            <div className="field success">active: true</div>
          </div>
          
          <div className="document">
            <div className="doc-header">Línea 2 - ORD-001</div>
            <div className="field">_id: ObjectId("...439052")</div>
            <div className="field highlight">id_order: "ORD-001"</div>
            <div className="field">id_producto: "507f1f77bcf86cd799439032"</div>
            <div className="field">quantity: 2</div>
            <div className="field success">active: true</div>
          </div>

          <div className="document">
            <div className="doc-header">Línea 3 - ORD-002</div>
            <div className="field">_id: ObjectId("...439053")</div>
            <div className="field">id_order: "ORD-002"</div>
            <div className="field">id_producto: "507f1f77bcf86cd799439031"</div>
            <div className="field">quantity: 1</div>
            <div className="field error">active: false</div>
          </div>
        </div>
      </div>

      <div className="collection">
        <h3>📁 catalogs Collection</h3>
        <div className="documents">
          <div className="document">
            <div className="doc-header">Producto 1</div>
            <div className="field">_id: ObjectId("507f1f77bcf86cd799439031")</div>
            <div className="field">name: "Chocolate Premium"</div>
            <div className="field price">cost: 150.00</div>
            <div className="field success">active: true</div>
          </div>
          
          <div className="document">
            <div className="doc-header">Producto 2</div>
            <div className="field">_id: ObjectId("507f1f77bcf86cd799439032")</div>
            <div className="field">name: "Dulce de Leche"</div>
            <div className="field price">cost: 75.00</div>
            <div className="field success">active: true</div>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="target-info"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3>🎯 Objetivo:</h3>
      <p>Obtener las líneas de la orden "ORD-001" con información completa de productos y subtotales calculados.</p>
    </motion.div>
  </div>
)

const OrderDetailsMatchStepSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🎯 Paso 1: $match - Filtrar por Orden
    </motion.h2>

    <motion.div 
      className="step-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3>🔍 Criterios de Filtrado:</h3>
      <div className="operation-demo">
        <div className="code-block">
          <span className="bracket">{`{`}</span><br/>
          <span className="indent">{`"$match": {`}</span><br/>
          <span className="indent2">{`"id_order": "ORD-001",`}</span><br/>
          <span className="indent2">{`"active": true`}</span><br/>
          <span className="indent">{`}`}</span><br/>
          <span className="bracket">{`}`}</span>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="filter-demo"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>🔄 Resultado del Filtrado:</h3>
      
      <div className="filter-process">
        <div className="input-docs">
          <h4>📥 3 Documentos de Entrada:</h4>
          <div className="doc-item success">✅ ORD-001, quantity: 3, active: true</div>
          <div className="doc-item success">✅ ORD-001, quantity: 2, active: true</div>
          <div className="doc-item error">❌ ORD-002, quantity: 1, active: false</div>
        </div>

        <div className="arrow">→</div>

        <div className="output-docs">
          <h4>📤 2 Documentos Filtrados:</h4>
          <div className="doc-item matched">🎯 ORD-001 | Chocolate Premium | Qty: 3</div>
          <div className="doc-item matched">🎯 ORD-001 | Dulce de Leche | Qty: 2</div>
        </div>
      </div>

      <div className="match-result">
        <p><strong>✨ 2 líneas</strong> de la orden ORD-001 que están activas pasan al siguiente paso.</p>
      </div>
    </motion.div>
  </div>
)

const OrderDetailsLookupStepSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🔗 Paso 2: $lookup Avanzado con Variables
    </motion.h2>

    <motion.div 
      className="step-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3>🚀 $lookup con $toObjectId y Variables:</h3>
      <div className="operation-demo">
        <div className="code-block">
          <span className="bracket">{`{`}</span><br/>
          <span className="indent">{`"$lookup": {`}</span><br/>
          <span className="indent2">{`"from": "catalogs",`}</span><br/>
          <span className="indent2">{`"let": {"product_id": {"$toObjectId": "$id_producto"}},`}</span><br/>
          <span className="indent2">{`"pipeline": [`}</span><br/>
          <span className="indent3">{`{"$match": {"$expr": {"$eq": ["$_id", "$$product_id"]}}}`}</span><br/>
          <span className="indent2">{`],`}</span><br/>
          <span className="indent2">{`"as": "product_info"`}</span><br/>
          <span className="indent">{`}`}</span><br/>
          <span className="bracket">{`}`}</span>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="lookup-explanation"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>🔍 Componentes Avanzados:</h3>
      
      <div className="lookup-components">
        <div className="component">
          <h4>🔧 let (Variables):</h4>
          <p>Define variables que se pueden usar en el pipeline interno.</p>
          <div className="example">
            <code>{`{"$toObjectId": "$id_producto"}`}</code> → Convierte string a ObjectId
          </div>
        </div>

        <div className="component">
          <h4>⚡ pipeline interno:</h4>
          <p>Sub-pipeline que se ejecuta en la colección destino.</p>
          <div className="example">
            <code>{`{"$expr": {"$eq": ["$_id", "$$product_id"]}}`}</code> → Comparación con variable
          </div>
        </div>

        <div className="component">
          <h4>📦 Resultado:</h4>
          <p>Cada documento get un array "product_info" con la información del producto.</p>
        </div>
      </div>

      <div className="lookup-result">
        <h4>✨ Resultado del JOIN:</h4>
        <div className="joined-data">
          <div className="order-line">
            <div className="line-info">Línea 1: Chocolate Premium (Qty: 3)</div>
            <div className="product-info">+ product_info: [{`{"name": "Chocolate Premium", "cost": 150.00}`}]</div>
          </div>
          <div className="order-line">
            <div className="line-info">Línea 2: Dulce de Leche (Qty: 2)</div>
            <div className="product-info">+ product_info: [{`{"name": "Dulce de Leche", "cost": 75.00}`}]</div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
)

const OrderDetailsAddFieldsStepSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🧮 Paso 3: $addFields con Cálculos Avanzados
    </motion.h2>

    <motion.div 
      className="step-explanation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3>💡 Campos Calculados:</h3>
      <div className="operation-demo">
        <div className="code-block">
          <span className="bracket">{`{`}</span><br/>
          <span className="indent">{`"$addFields": {`}</span><br/>
          <span className="indent2">{`"product": {"$arrayElemAt": ["$product_info", 0]},`}</span><br/>
          <span className="indent2">{`"product_price": {"$arrayElemAt": ["$product_info.cost", 0]},`}</span><br/>
          <span className="indent2">{`"line_subtotal": {`}</span><br/>
          <span className="indent3">{`"$cond": {`}</span><br/>
          <span className="indent4">{`"if": {"$gt": [{"$size": "$product_info"}, 0]},`}</span><br/>
          <span className="indent4">{`"then": {"$multiply": ["$quantity", {"$arrayElemAt": ["$product_info.cost", 0]}]},`}</span><br/>
          <span className="indent4">{`"else": 0`}</span><br/>
          <span className="indent3">{`}`}</span><br/>
          <span className="indent2">{`}`}</span><br/>
          <span className="indent">{`}`}</span><br/>
          <span className="bracket">{`}`}</span>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="calculations-explanation"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>🔢 Explicación de Cálculos:</h3>
      
      <div className="calculation-steps">
        <div className="calc-step">
          <h4>1️⃣ Extraer Producto:</h4>
          <div className="formula">
            <code>{`{"$arrayElemAt": ["$product_info", 0]}`}</code>
          </div>
          <p>Obtiene el primer (y único) elemento del array product_info</p>
        </div>

        <div className="calc-step">
          <h4>2️⃣ Extraer Precio:</h4>
          <div className="formula">
            <code>{`{"$arrayElemAt": ["$product_info.cost", 0]}`}</code>
          </div>
          <p>Extrae el precio del producto para usar en cálculos</p>
        </div>

        <div className="calc-step advanced">
          <h4>3️⃣ Calcular Subtotal Condicional:</h4>
          <div className="formula">
            <code>$cond</code> → IF-THEN-ELSE logic
          </div>
          <div className="condition-logic">
            <div className="if-part">
              <strong>IF:</strong> <code>{`{"$size": "$product_info"} > 0`}</code>
              <p>¿Hay información del producto?</p>
            </div>
            <div className="then-part">
              <strong>THEN:</strong> <code>quantity × precio</code>
              <p>Calcular subtotal normal</p>
            </div>
            <div className="else-part">
              <strong>ELSE:</strong> <code>0</code>
              <p>Producto no encontrado</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
)

const OrderDetailsCalculationSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🧮 Demostración de Cálculos en Tiempo Real
    </motion.h2>

    <motion.div 
      className="calculations-demo"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3>📊 Cálculo Paso a Paso:</h3>
      
      <div className="calculation-examples">
        <div className="calc-example">
          <h4>🍫 Línea 1: Chocolate Premium</h4>
          <div className="calc-breakdown">
            <div className="calc-input">
              <div className="input-item">quantity: <span className="value">3</span></div>
              <div className="input-item">product_price: <span className="value">150.00</span></div>
              <div className="input-item">product_info.length: <span className="value">1</span> (✅ &gt; 0)</div>
            </div>
            
            <div className="calc-process">
              <div className="formula-step">
                <span className="step">1.</span> IF condition: <code>1 &gt; 0</code> = <span className="result true">true</span>
              </div>
              <div className="formula-step">
                <span className="step">2.</span> THEN: <code>3 × 150.00</code> = <span className="result">450.00</span>
              </div>
            </div>

            <div className="calc-result success">
              <strong>line_subtotal: 450.00</strong>
            </div>
          </div>
        </div>

        <div className="calc-example">
          <h4>🍯 Línea 2: Dulce de Leche</h4>
          <div className="calc-breakdown">
            <div className="calc-input">
              <div className="input-item">quantity: <span className="value">2</span></div>
              <div className="input-item">product_price: <span className="value">75.00</span></div>
              <div className="input-item">product_info.length: <span className="value">1</span> (✅ &gt; 0)</div>
            </div>
            
            <div className="calc-process">
              <div className="formula-step">
                <span className="step">1.</span> IF condition: <code>1 &gt; 0</code> = <span className="result true">true</span>
              </div>
              <div className="formula-step">
                <span className="step">2.</span> THEN: <code>2 × 75.00</code> = <span className="result">150.00</span>
              </div>
            </div>

            <div className="calc-result success">
              <strong>line_subtotal: 150.00</strong>
            </div>
          </div>
        </div>

        <div className="calc-example error-case">
          <h4>❌ Caso de Error: Producto No Encontrado</h4>
          <div className="calc-breakdown">
            <div className="calc-input">
              <div className="input-item">quantity: <span className="value">5</span></div>
              <div className="input-item">product_info.length: <span className="value">0</span> (❌ = 0)</div>
            </div>
            
            <div className="calc-process">
              <div className="formula-step">
                <span className="step">1.</span> IF condition: <code>0 &gt; 0</code> = <span className="result false">false</span>
              </div>
              <div className="formula-step">
                <span className="step">2.</span> ELSE: <span className="result">0</span>
              </div>
            </div>

            <div className="calc-result error">
              <strong>line_subtotal: 0</strong> (Producto no encontrado)
            </div>
          </div>
        </div>
      </div>

      <div className="total-calculation">
        <h4>📈 Total de la Orden:</h4>
        <div className="total-breakdown">
          <div className="total-line">Línea 1: <span>450.00</span></div>
          <div className="total-line">Línea 2: <span>150.00</span></div>
          <div className="total-separator"></div>
          <div className="total-final">Total Orden: <span>600.00</span></div>
        </div>
      </div>
    </motion.div>
  </div>
)

const OrderDetailsFinalResultSlide = () => (
  <div className="slide-content">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      🎉 Resultado Final - Orden Completa con Cálculos
    </motion.h2>

    <motion.div 
      className="pipeline-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3>📋 Pipeline Completo Ejecutado:</h3>
      <div className="pipeline-steps">
        <div className="step">1️⃣ $match → Filtrar por orden activa</div>
        <div className="step">2️⃣ $lookup → JOIN con productos usando variables</div>
        <div className="step">3️⃣ $addFields → Cálculos automáticos de subtotales</div>
      </div>
    </motion.div>

    <motion.div 
      className="final-result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3>✨ Resultado Final:</h3>
      <div className="result-documents">
        <div className="result-doc success">
          <div className="field">_id: "507f1f77bcf86cd799439051"</div>
          <div className="field">id_order: "ORD-001"</div>
          <div className="field">id_producto: "507f1f77bcf86cd799439031"</div>
          <div className="field">quantity: 3</div>
          <div className="field highlight">product: {`{"name": "Chocolate Premium", "cost": 150.00}`}</div>
          <div className="field highlight">product_price: 150.00</div>
          <div className="field price">line_subtotal: 450.00</div>
        </div>
        
        <div className="result-doc success">
          <div className="field">_id: "507f1f77bcf86cd799439052"</div>
          <div className="field">id_order: "ORD-001"</div>
          <div className="field">id_producto: "507f1f77bcf86cd799439032"</div>
          <div className="field">quantity: 2</div>
          <div className="field highlight">product: {`{"name": "Dulce de Leche", "cost": 75.00}`}</div>
          <div className="field highlight">product_price: 75.00</div>
          <div className="field price">line_subtotal: 150.00</div>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="business-value"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3>💼 Valor para el Negocio:</h3>
      <div className="value-points">
        <div className="value-point">
          <span className="icon">⚡</span>
          <div>
            <strong>Cálculos en Tiempo Real:</strong>
            <p>Subtotales actualizados automáticamente con precios actuales</p>
          </div>
        </div>
        <div className="value-point">
          <span className="icon">🛡️</span>
          <div>
            <strong>Manejo de Errores:</strong>
            <p>Productos no encontrados no rompen el cálculo</p>
          </div>
        </div>
        <div className="value-point">
          <span className="icon">🚀</span>
          <div>
            <strong>Performance:</strong>
            <p>Una sola operación de base de datos para todo el cálculo</p>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="success-message"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <p>🎯 ¡Pipeline completo para órdenes con cálculos automáticos y manejo robusto de datos!</p>
    </motion.div>
  </div>
)

export default App
