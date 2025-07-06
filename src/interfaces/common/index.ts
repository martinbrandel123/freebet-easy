export interface Bookmaker {
  id: string
  name: string
  logo: string
}

export interface Testimonial {
  name: string
  age: number
  location: string
  text: string
  rating: number
  avatar: string
  gain: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface MoneyExample {
  title: string
  description: string
  icon: string
  visual: string
}

export interface Step {
  number: number
  title: string
  description: string
  icon: string
  visible: boolean
}

export interface Reason {
  icon: string
  title: string
  description: string
  highlight: string
  visible: boolean
}