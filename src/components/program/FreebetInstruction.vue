<template>
  <div class="freebet-instruction-container">
    <FreebetInstructionHeader />
    <FreebetCombinationsGrid :parlays="parlays" />
  </div>
</template>

<script setup lang="ts">
import FreebetInstructionHeader from './FreebetInstructionHeader.vue'
import FreebetCombinationsGrid from './FreebetCombinationsGrid.vue'

const props = defineProps({
  currentStep: {
    type: Object,
    required: true,
  },
})

// pour le header
interface MatchOverview {
  homeTeam: string,
  awayTeam: string,
  competition: string,
  startingDate: string,
  betType?: 'Moneyline',
}


// pour l'affichage des pronostics
interface Bet {
  homeTeam: string,
  awayTeam: string,
  result: 'home' | 'draw' | 'away',
  bookmaker: string,
  odd: number,
  startingDate: string,
  bookmakerLink: string,

}

interface Parlay {
  id: string,
  bookmaker: string,
  totalOdd: number,
  combiné?: Bet[], // entre 2 et 3 issues
  betType: 'CASH' | 'FREEBET',
  betAmount: number,

  isBetPlaced: boolean
}

// Données des matchs
const psgVsMarseille: MatchOverview = {
  homeTeam: 'PSG',
  awayTeam: 'Marseille',
  competition: 'Ligue 1',
  startingDate: '2023-11-06T21:00:00',
  betType: 'Moneyline'
}

const romaVsJuventus: MatchOverview = {
  homeTeam: 'AS Roma',
  awayTeam: 'Juventus',
  competition: 'Serie A',
  startingDate: '2023-11-05T20:45:00',
  betType: 'Moneyline'
}

const MatchsOverview: MatchOverview[] = [psgVsMarseille, romaVsJuventus]


// Paris simples pour chaque match
const psgMarseilleBets: Bet[] = [
  {
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    result: 'home',
    bookmaker: 'Bet365',
    odd: 2.9,
    startingDate: psgVsMarseille.startingDate,
    bookmakerLink: '#'
  },
  {
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    result: 'draw',
    bookmaker: 'Bet365',
    odd: 3.15,
    startingDate: psgVsMarseille.startingDate,
    bookmakerLink: '#'
  },
  {
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    result: 'away',
    bookmaker: 'Bet365',
    odd: 2.7,
    startingDate: psgVsMarseille.startingDate,
    bookmakerLink: '#'
  }
]

const romaJuventusBets: Bet[] = [
  {
    homeTeam: 'AS Roma',
    awayTeam: 'Juventus',
    result: 'home',
    bookmaker: 'Bet365',
    odd: 2.2,
    startingDate: romaVsJuventus.startingDate,
    bookmakerLink: '#'
  },
  {
    homeTeam: 'AS Roma',
    awayTeam: 'Juventus',
    result: 'draw',
    bookmaker: 'Bet365',
    odd: 3.7,
    startingDate: romaVsJuventus.startingDate,
    bookmakerLink: '#'
  },
  {
    homeTeam: 'AS Roma',
    awayTeam: 'Juventus',
    result: 'away',
    bookmaker: 'Bet365',
    odd: 2.3,
    startingDate: romaVsJuventus.startingDate,
    bookmakerLink: '#'
  }
]

// Génération des 9 paris combinés
const parlays: Parlay[] = []

// On crée toutes les combinaisons possibles
let id = 1
for (const psgBet of psgMarseilleBets) {
  for (const romaBet of romaJuventusBets) {
    parlays.push({
      id: `parlay-${id++}`,
      bookmaker: 'Bet365',
      totalOdd: parseFloat((psgBet.odd * romaBet.odd).toFixed(2)),
      combiné: [psgBet, romaBet],
      betType: 'FREEBET',
      betAmount: 10,
      isBetPlaced: false
    })
  }
}




</script>

<style scoped>
.freebet-instruction-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 767px) {
  .freebet-instruction-container {
    padding: 0 0;
  }
}
</style>