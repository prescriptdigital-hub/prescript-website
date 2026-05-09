"use client"
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-prescript-green text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-prescript-green-mid transition-colors"
    >
      Download PDF
    </button>
  )
}
