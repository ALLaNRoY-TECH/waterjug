# **App Name**: Aqua Puzzle

## Core Features:

- Fill Jug: Allow the player to fill either Jug A or Jug B from a limitless water source.
- Pour Water: Enable pouring water from one jug to another until the destination jug is full or the source jug is empty.
- Empty Jug: Allow the player to empty either Jug A or Jug B completely.
- Target Measurement: Define a target amount of water for each level that the player must achieve using the jugs.
- Move Tracking: Keep track of the number of moves the player makes to solve the puzzle.
- Level Progression: Implement a series of levels with increasing difficulty as the player progresses. Store level data and user progress using Firestore.
- AI Hint Tool: Generates context-aware hints if the user is struggling to complete a level. The AI tool decides whether the hint is helpful before showing it to the player.

## Style Guidelines:

- Primary color: Medium sky blue (#74B9FF) to evoke a sense of water and clarity.
- Background color: Light desaturated sky blue (#D1E8FF) for a soft, pleasant backdrop.
- Accent color: Pale yellow (#FFFF8C) for interactive elements and highlights to draw attention.
- Headline font: 'Poppins' sans-serif for the title and headings, providing a modern look.
- Body font: 'PT Sans' sans-serif for instructions and level info to be easy to read.
- Use smooth animated water tap and cartoon-style puddle to indicate key game operations.
- Implement a modern glassmorphism UI style with a soft gradient background to simulate a sky and grass landscape.
- Water level rising and falling with smooth animations, realistic tilting jug animation when pouring, and confetti animation on win.