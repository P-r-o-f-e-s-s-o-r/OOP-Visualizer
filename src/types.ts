export type ConceptId = 'encapsulation' | 'inheritance' | 'polymorphism' | 'abstraction';

export interface InteractivePart {
  id: string;
  label: string;
}

export interface ConceptModule {
  id: ConceptId;
  title: string;
  description: string;
  analogy: string;
  codeSnippet: string;
  interactiveParts: InteractivePart[];
  xp: number;
}

export interface UserProgress {
  xp: number;
  completedModules: ConceptId[];
  badges: string[];
}

export const MODULES: ConceptModule[] = [
  {
    id: 'encapsulation',
    title: 'Encapsulation',
    description: 'Encapsulation is the bundling of data with the methods that operate on that data, restricting direct access to some of an object\'s components.',
    analogy: 'Think of a secure bank vault. You can\'t just walk in and take money; you must use a teller (method) who verifies your identity and then handles the transaction for you.',
    codeSnippet: `class BankAccount {
  private balance: number = 0;

  public deposit(amount: number) {
    if (amount > 0) this.balance += amount;
  }

  public getBalance() {
    return this.balance;
  }
}`,
    interactiveParts: [
      { id: 'deposit', label: 'deposit()' },
      { id: 'getBalance', label: 'getBalance()' },
      { id: 'balance', label: 'balance' }
    ],
    xp: 100
  },
  {
    id: 'inheritance',
    title: 'Inheritance',
    description: 'Inheritance allows a class (child) to acquire the properties and behaviors of another class (parent), promoting code reuse.',
    analogy: 'A generic "Vehicle" has wheels and an engine. A "Car" inherits those but adds specific features like a trunk, while an "Electric Car" inherits from "Car" but overrides the engine with a battery.',
    codeSnippet: `class Vehicle {
  speed: number = 0;
  move() { console.log("Moving..."); }
}

class Car extends Vehicle {
  fuelLevel: number = 100;
}

class ElectricCar extends Car {
  batteryLevel: number = 100;
  // Overriding move
  move() { console.log("Moving silently..."); }
}`,
    interactiveParts: [
      { id: 'move', label: 'move()' },
      { id: 'extends', label: 'extends' },
      { id: 'speed', label: 'speed' }
    ],
    xp: 100
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism',
    description: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass, where each object responds to the same method call in its own way.',
    analogy: 'Imagine a "Speak" command given to different animals. A dog barks, a cat meows, and a bird chirps. They all "Speak", but the behavior is different.',
    codeSnippet: `interface Animal {
  speak(): void;
}

class Dog implements Animal {
  speak() { console.log("Woof!"); }
}

class Cat implements Animal {
  speak() { console.log("Meow!"); }
}`,
    interactiveParts: [
      { id: 'speak', label: 'speak()' }
    ],
    xp: 100
  },
  {
    id: 'abstraction',
    title: 'Abstraction',
    description: 'Abstraction hides complex implementation details and only shows the essential features of an object to the user.',
    analogy: 'When you use a coffee machine, you just press a button. You don\'t need to know how the water is heated or how the beans are ground internally.',
    codeSnippet: `abstract class CoffeeMachine {
  public abstract brew(): void;
  
  protected heatWater() { /* complex logic */ }
  protected grindBeans() { /* complex logic */ }
  protected extractCoffee() { /* complex logic */ }
}

class EspressoMachine extends CoffeeMachine {
  public brew() {
    this.heatWater();
    this.grindBeans();
    this.extractCoffee();
  }
}`,
    interactiveParts: [
      { id: 'brew', label: 'brew()' },
      { id: 'heatWater', label: 'heatWater()' },
      { id: 'grindBeans', label: 'grindBeans()' },
      { id: 'extractCoffee', label: 'extractCoffee()' }
    ],
    xp: 100
  }
];
