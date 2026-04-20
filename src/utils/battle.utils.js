const getStat = (pokemon, statName) =>
  pokemon.stats.find((s) => s.name === statName)?.baseStat ?? 0

const simulateBattle = (pokemonA, pokemonB) => {
  const speedA = getStat(pokemonA, "speed")
  const speedB = getStat(pokemonB, "speed")
  const attackA = getStat(pokemonA, "attack")
  const attackB = getStat(pokemonB, "attack")
  const defenseA = getStat(pokemonA, "defense")
  const defenseB = getStat(pokemonB, "defense")

  const faster = speedA >= speedB ? pokemonA : pokemonB
  const slower = faster === pokemonA ? pokemonB : pokemonA
  const fasterAttack = faster === pokemonA ? attackA : attackB
  const slowerAttack = faster === pokemonA ? attackB : attackA
  const fasterDefense = faster === pokemonA ? defenseA : defenseB
  const slowerDefense = faster === pokemonA ? defenseB : defenseA

  if (fasterAttack > slowerDefense) return faster

  if (slowerAttack > fasterDefense) return slower

  return faster
}

export const simulateTeamBattle = (teamA, teamB) => {
  const queueA = [...teamA]
  const queueB = [...teamB]
  const rounds = []

  while (queueA.length > 0 && queueB.length > 0) {
    const pokemonA = queueA[0]
    const pokemonB = queueB[0]
    const winner = simulateBattle(pokemonA, pokemonB)
    const loser = winner === pokemonA ? pokemonB : pokemonA

    rounds.push({
      pokemonA,
      pokemonB,
      winner,
      loser,
    })

    if (winner === pokemonA) {
      queueB.shift()
    } else {
      queueA.shift()
    }
  }

  return {
    rounds,
    winner: queueA.length > 0 ? "teamA" : "teamB",
    teamASurvivors: queueA,
    teamBSurvivors: queueB,
    teamADefeated: teamA.filter((p) => !queueA.includes(p)),
    teamBDefeated: teamB.filter((p) => !queueB.includes(p)),
  }
}