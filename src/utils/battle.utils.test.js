import { simulateTeamBattle } from "./battle.utils"

const makePokemon = (name, { attack, defense, speed }) => ({
  id: name,
  name,
  image: "",
  types: [],
  stats: [
    { name: "attack", baseStat: attack },
    { name: "defense", baseStat: defense },
    { name: "speed", baseStat: speed },
  ],
})

describe("simulateTeamBattle", () => {

  describe("casos felices", () => {
    it("el equipo A gana si sus pokemon son superiores", () => {
      const teamA = [
        makePokemon("pikachu", { attack: 100, defense: 50, speed: 90 }),
        makePokemon("charizard", { attack: 100, defense: 50, speed: 90 }),
      ]
      const teamB = [
        makePokemon("rattata", { attack: 10, defense: 10, speed: 10 }),
        makePokemon("magikarp", { attack: 10, defense: 10, speed: 10 }),
      ]

      const result = simulateTeamBattle(teamA, teamB)

      expect(result.winner).toBe("teamA")
      expect(result.teamASurvivors.length).toBeGreaterThan(0)
      expect(result.teamBSurvivors.length).toBe(0)
      expect(result.teamBDefeated.length).toBe(teamB.length)
    })

    it("el equipo B gana si sus pokemon son superiores", () => {
      const teamA = [
        makePokemon("rattata", { attack: 10, defense: 10, speed: 10 }),
        makePokemon("magikarp", { attack: 10, defense: 10, speed: 10 }),
      ]
      const teamB = [
        makePokemon("pikachu", { attack: 100, defense: 50, speed: 90 }),
        makePokemon("charizard", { attack: 100, defense: 50, speed: 90 }),
      ]

      const result = simulateTeamBattle(teamA, teamB)

      expect(result.winner).toBe("teamB")
      expect(result.teamBSurvivors.length).toBeGreaterThan(0)
      expect(result.teamASurvivors.length).toBe(0)
      expect(result.teamADefeated.length).toBe(teamA.length)
    })
  })

  describe("casos límite", () => {
    it("un pokemon fuerte elimina a todo el equipo rival", () => {
      const teamA = [makePokemon("mewtwo", { attack: 999, defense: 999, speed: 999 })]
      const teamB = [
        makePokemon("rattata", { attack: 10, defense: 10, speed: 10 }),
        makePokemon("magikarp", { attack: 10, defense: 10, speed: 10 }),
        makePokemon("caterpie", { attack: 10, defense: 10, speed: 10 }),
      ]

      const result = simulateTeamBattle(teamA, teamB)

      expect(result.winner).toBe("teamA")
      expect(result.rounds.length).toBe(3)
      expect(result.teamASurvivors[0].name).toBe("mewtwo")
    })
  })
})