import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type ContactModalVariant = 'adFactory' | 'glitch' | 'hookHunter' | 'amplifier' | 'empire' | 'global'

type ContactModalContextValue = {
  modalOpen: boolean
  variant: ContactModalVariant
  openModal: (variant?: ContactModalVariant) => void
  closeModal: () => void
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null)

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [variant, setVariant] = useState<ContactModalVariant>('global')

  const openModal = useCallback((v: ContactModalVariant = 'global') => {
    setVariant(v)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <ContactModalContext.Provider
      value={{ modalOpen, variant, openModal, closeModal }}
    >
      {children}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) {
    return {
      modalOpen: false,
      variant: 'global' as ContactModalVariant,
      openModal: () => {},
      closeModal: () => {},
    }
  }
  return ctx
}
