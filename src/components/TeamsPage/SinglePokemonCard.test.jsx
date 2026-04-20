import { render, screen } from "@testing-library/react"
import SinglePokemonCard from "./SinglePokemonCard"

jest.mock("@dnd-kit/react", () => ({
  useDraggable: () => ({ ref: jest.fn() }),
  useDroppable: () => ({ ref: jest.fn() }),
}))

jest.mock("lucide-react", () => ({
  GripHorizontal: () => <span data-testid="grip-icon" />,
}))

const mockPokemon = {
  id: 1,
  name: "pikachu",
  image: "https://example.com/pikachu.png",
  types: ["electric"],
  stats: [
    { name: "attack", baseStat: 55 },
    { name: "defense", baseStat: 40 },
    { name: "speed", baseStat: 90 },
  ],
}

describe("SinglePokemonCard", () => {
  it("renderiza el nombre capitalizado", () => {
    render(<SinglePokemonCard pokemon={mockPokemon} />)
    expect(screen.getByText("Pikachu")).toBeInTheDocument()
  })

  it("renderiza la imagen del pokemon", () => {
    render(<SinglePokemonCard pokemon={mockPokemon} />)
    const img = screen.getByAltText("Imagen del pokemon pikachu")
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", mockPokemon.image)
  })

  it("renderiza la pokeball si no hay imagen", () => {
    const pokemonSinImagen = { ...mockPokemon, image: null }
    render(<SinglePokemonCard pokemon={pokemonSinImagen} />)
    const img = screen.getByAltText("Imagen del pokemon pikachu")
    expect(img).toHaveAttribute("src", "test-file-stub")
  })

  it("renderiza los emojis de tipo", () => {
    render(<SinglePokemonCard pokemon={mockPokemon} />)
    expect(screen.getByText("⚡")).toBeInTheDocument()
  })

  it("renderiza todas las stats", () => {
    render(<SinglePokemonCard pokemon={mockPokemon} />)
    expect(screen.getByText("At: 55")).toBeInTheDocument()
    expect(screen.getByText("Def: 40")).toBeInTheDocument()
    expect(screen.getByText("Spd: 90")).toBeInTheDocument()
  })

  it("renderiza el botón de grip", () => {
    render(<SinglePokemonCard pokemon={mockPokemon} />)
    expect(screen.getByTestId("grip-icon")).toBeInTheDocument()
  })
})