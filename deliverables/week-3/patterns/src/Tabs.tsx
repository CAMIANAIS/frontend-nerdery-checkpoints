import { createContext, useContext, useState, type ReactNode } from 'react'

// ---------------------------------------------------------------------------
// STUB IMPLEMENTATION
// Renders the sub-components flat with the correct roles so tests fail on the
// behavioural assertions (one visible panel, aria-selected, switching) rather
// than on import errors. Replace with the reference solution.
// ---------------------------------------------------------------------------

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

interface TabsProps {
  defaultValue: string
  children: ReactNode
}

function TabsRoot({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: ReactNode
}

function TabsList({ children }: TabsListProps) {
  return <div role="tablist">{children}</div>
}

interface TabProps {
  value: string
  children: ReactNode
}

function Tab({ value: valueTab, children }: TabProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')
  const { value, setValue } = context
  return (
    <button type="button" role="tab" aria-selected={valueTab === value} onClick={() => setValue(valueTab)}>
      {children}
    </button>
  )
}

interface TabsPanelProps {
  value: string
  children: ReactNode
}

function TabsPanel({ value: valuePanel, children }: TabsPanelProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabPanel must be used within Tabs')
  const { value } = context
  return valuePanel === value ? <div role="tabpanel">{children}</div> : null
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})
