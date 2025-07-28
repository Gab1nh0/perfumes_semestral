export interface Perfume {
  id: number
  nombre: string
  descripcion: string
}

export const getPerfumes = async (order: string[]): Promise<Perfume[]> => {
  const response = await fetch("https://ui1qmq75di.execute-api.us-east-1.amazonaws.com/test/principal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order }),
  })

  if (!response.ok) {
    throw new Error(`Error al obtener perfumes: ${response.statusText}`)
  }

  const json = await response.json()

  // Si el backend responde { body: '[{"id":1, ...}]' }
  if (typeof json.body === "string") {
    return JSON.parse(json.body)
  }

  // Si el backend responde un array directamente
  if (Array.isArray(json.body)) {
    return json.body
  }

  // Si el backend responde un array directamente (sin "body")
  if (Array.isArray(json)) {
    return json
  }

  // En cualquier otro caso
  return []
}
