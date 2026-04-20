import { capitalize } from "./capitalize.utils"

describe("capitalize", () => {
  it("capitaliza la primera letra", () => {
    expect(capitalize("pikachu")).toBe("Pikachu")
  })

  it("no modifica el resto de la cadena", () => {
    expect(capitalize("bulbasaur")).toBe("Bulbasaur")
  })

  it("mantiene mayúsculas existentes", () => {
    expect(capitalize("mister mime")).toBe("Mister mime")
  })

  it("funciona con un solo carácter", () => {
    expect(capitalize("a")).toBe("A")
  })

  it("funciona con string vacío", () => {
    expect(capitalize("")).toBe("")
  })
})