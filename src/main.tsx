import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/styles.css'
import { pdfjs } from 'react-pdf'

const rootElement: HTMLElement | null = document.querySelector('#root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const root = createRoot(rootElement)

const app: React.ReactElement = <App />
root.render(app)

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`