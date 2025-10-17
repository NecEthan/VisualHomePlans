import React, { createContext, useContext, useReducer, useEffect } from 'react'

interface Material {
  _id: string
  name: string
  description: string
  category: string
  price: number
  unit: string
  supplierName: string
  supplierUrl: string
  imageUrl: string
  thumbnailUrl?: string
  rating: number
  inStock: boolean
  specifications?: {
    color?: string
    finish?: string
    material?: string
    dimensions?: string
  }
}

interface SelectedMaterial extends Material {
  appliedTo: 'flooring' | 'walls' | 'roofing' | 'windows' | 'doors' | 'lighting' | 'furniture'
  quantity?: number
}

interface MaterialState {
  selectedMaterials: SelectedMaterial[]
  isCartOpen: boolean
}

type MaterialAction =
  | { type: 'ADD_MATERIAL'; payload: { material: Material; appliedTo: SelectedMaterial['appliedTo'] } }
  | { type: 'REMOVE_MATERIAL'; payload: string }
  | { type: 'CLEAR_MATERIALS' }
  | { type: 'UPDATE_MATERIAL_QUANTITY'; payload: { materialId: string; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_FROM_STORAGE'; payload: SelectedMaterial[] }

const MaterialContext = createContext<{
  state: MaterialState
  dispatch: React.Dispatch<MaterialAction>
  addMaterial: (material: Material, appliedTo: SelectedMaterial['appliedTo']) => void
  removeMaterial: (materialId: string) => void
  clearMaterials: () => void
  updateQuantity: (materialId: string, quantity: number) => void
  toggleCart: () => void
  closeCart: () => void
  getTotalCost: () => number
  getMaterialsByCategory: (category: string) => SelectedMaterial[]
} | null>(null)

const materialReducer = (state: MaterialState, action: MaterialAction): MaterialState => {
  switch (action.type) {
    case 'ADD_MATERIAL':
      const existingIndex = state.selectedMaterials.findIndex(
        m => m._id === action.payload.material._id && m.appliedTo === action.payload.appliedTo
      )
      
      if (existingIndex >= 0) {
        // Material already exists for this category, update it
        const updatedMaterials = [...state.selectedMaterials]
        updatedMaterials[existingIndex] = {
          ...updatedMaterials[existingIndex],
          ...action.payload.material,
          appliedTo: action.payload.appliedTo
        }
        return { ...state, selectedMaterials: updatedMaterials }
      } else {
        // Add new material
        return {
          ...state,
          selectedMaterials: [
            ...state.selectedMaterials,
            { ...action.payload.material, appliedTo: action.payload.appliedTo }
          ]
        }
      }

    case 'REMOVE_MATERIAL':
      return {
        ...state,
        selectedMaterials: state.selectedMaterials.filter(m => m._id !== action.payload)
      }

    case 'CLEAR_MATERIALS':
      return {
        ...state,
        selectedMaterials: []
      }

    case 'UPDATE_MATERIAL_QUANTITY':
      return {
        ...state,
        selectedMaterials: state.selectedMaterials.map(m =>
          m._id === action.payload.materialId
            ? { ...m, quantity: action.payload.quantity }
            : m
        )
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      }

    case 'CLOSE_CART':
      return {
        ...state,
        isCartOpen: false
      }

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        selectedMaterials: action.payload
      }

    default:
      return state
  }
}

const initialState: MaterialState = {
  selectedMaterials: [],
  isCartOpen: false
}

export const MaterialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(materialReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const savedMaterials = localStorage.getItem('selectedMaterials')
    if (savedMaterials) {
      try {
        const parsed = JSON.parse(savedMaterials)
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed })
      } catch (error) {
        console.error('Error loading materials from localStorage:', error)
      }
    }
  }, [])

  // Save to localStorage whenever materials change
  useEffect(() => {
    localStorage.setItem('selectedMaterials', JSON.stringify(state.selectedMaterials))
  }, [state.selectedMaterials])

  const addMaterial = (material: Material, appliedTo: SelectedMaterial['appliedTo']) => {
    dispatch({ type: 'ADD_MATERIAL', payload: { material, appliedTo } })
  }

  const removeMaterial = (materialId: string) => {
    dispatch({ type: 'REMOVE_MATERIAL', payload: materialId })
  }

  const clearMaterials = () => {
    dispatch({ type: 'CLEAR_MATERIALS' })
  }

  const updateQuantity = (materialId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_MATERIAL_QUANTITY', payload: { materialId, quantity } })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  const getTotalCost = () => {
    return state.selectedMaterials.reduce((total, material) => {
      const quantity = material.quantity || 1
      return total + (material.price * quantity)
    }, 0)
  }

  const getMaterialsByCategory = (category: string) => {
    return state.selectedMaterials.filter(material => material.category === category)
  }

  const value = {
    state,
    dispatch,
    addMaterial,
    removeMaterial,
    clearMaterials,
    updateQuantity,
    toggleCart,
    closeCart,
    getTotalCost,
    getMaterialsByCategory
  }

  return (
    <MaterialContext.Provider value={value}>
      {children}
    </MaterialContext.Provider>
  )
}

export const useMaterialContext = () => {
  const context = useContext(MaterialContext)
  if (!context) {
    throw new Error('useMaterialContext must be used within a MaterialProvider')
  }
  return context
}

export default MaterialContext
