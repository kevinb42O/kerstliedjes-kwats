# Planning Guide

A digital Christmas Eve table game where players pass a phone around, decode heavily disguised Christmas song titles in "drunk gibberish" phonetics, and compete to guess the real songs - creating memorable holiday moments through laughter and friendly competition.

**Experience Qualities**:
1. **Cozy Elegance** - The interface should feel like stepping into a beautifully decorated holiday gathering, with warm colors and refined details that evoke the magic of Christmas Eve
2. **Playful Sophistication** - Balance whimsy with polish; the gibberish is silly but the presentation is refined, creating an experience that feels both fun and thoughtfully crafted
3. **Effortless Flow** - The pass-the-phone mechanic should feel completely natural with clear visual cues and smooth transitions that guide players through each phase without confusion

**Complexity Level**: Light Application (multiple features with basic state)
- This is a focused party game with player management, turn-based gameplay, scoring, and visual feedback - more than a single tool but contained enough to feel instantly accessible

## Essential Features

**Player Seating System**
- Functionality: Allows players to sequentially add their names to create a digital table setup
- Purpose: Establishes the group and creates anticipation before gameplay begins
- Trigger: "Start Game" button on welcome screen
- Progression: Welcome screen → Name input for Player 1 → Confirm → "Pass phone" prompt → Name input for Player 2 → Continue until all seated → Confirmation screen showing all players
- Success criteria: Minimum 2 players can be added, names persist throughout game, clear visual indication of who has joined

**Random Player Selection with Visual Drama**
- Functionality: Randomly selects the next reader with an animated highlight effect
- Purpose: Builds anticipation and clearly signals whose turn it is in a delightful way
- Trigger: "Start Game" button or after a correct guess awards the next turn
- Progression: Game start/turn end → Animated player name shuffle → Dramatic slowdown → Selected player highlighted with sparkle effect → "Reveal Song" button appears
- Success criteria: Selection is truly random (except when guesser gets next turn), animation is smooth and engaging, selected player is unmistakably clear

**Gibberish Song Display**
- Functionality: Shows phonetically disguised Christmas song titles for the reader to pronounce aloud
- Purpose: Creates the core gameplay challenge and generates laughter through mispronunciation
- Trigger: Reader taps "Reveal Song" button
- Progression: Player selected → Tap to reveal → Large, prominent gibberish text displayed → Reader reads aloud → Group guesses
- Success criteria: Text is large and easily readable, gibberish is challenging but decipherable when spoken, contains 15+ songs for variety

**Scoring and Turn Progression**
- Functionality: Awards points to correct guessers and automatically assigns them the next turn
- Purpose: Rewards quick thinking and maintains game momentum by giving winners immediate engagement
- Trigger: Reader taps "Correct Guess" and selects who guessed
- Progression: Group makes guess → Reader confirms correct guesser → Delightful score animation → Guesser's score updates → Guesser automatically becomes next reader → Next round begins
- Success criteria: Scores update with satisfying animation, turn order feels fair and rewarding, transition to next round is seamless

**Leaderboard and Game End**
- Functionality: Displays final scores with celebratory presentation for the winner
- Purpose: Provides closure and celebrates the champion while encouraging replay
- Trigger: Host manually ends game via "End Game" button in menu, or after all songs used
- Progression: Game ends → Animated transition to leaderboard → Champion announcement → Ranked player list with scores → "Play Again" option
- Success criteria: Winner is clearly celebrated, all scores are visible, easy to start a new game

## Edge Case Handling

- **Single Player Entry**: If only one player joins, display a friendly message requiring at least 2 players before starting
- **Duplicate Names**: Append a number suffix (e.g., "Jan (2)") if same name is entered to avoid confusion
- **Song Exhaustion**: If all songs are used before manual end, automatically trigger leaderboard with "All songs completed!" message
- **Accidental Answer Reveal**: No answer reveal button for reader - they must know the real song; include a "Skip Song" option for truly impossible gibberish
- **Mid-Game Exit**: Show confirmation dialog if user tries to leave during active game to prevent accidental exits
- **Long Names**: Truncate names longer than 15 characters with ellipsis to maintain layout integrity

## Design Direction

The design should evoke the warmth of a candlelit Christmas dinner party - rich, inviting colors with subtle sparkle, elegant typography that feels both festive and refined, and animations that delight without overwhelming. It should feel like unwrapping a beautifully wrapped gift: sophisticated presentation revealing playful content.

## Color Selection

A rich, warm palette inspired by traditional Christmas gatherings with deep jewel tones and metallic accents.

- **Primary Color**: Deep Forest Green (oklch(0.35 0.08 155)) - Evokes Christmas trees and creates a grounded, sophisticated foundation that feels both festive and elegant
- **Secondary Colors**: Rich Cranberry Red (oklch(0.45 0.18 15)) for accents and buttons, creating warmth and festive energy without overwhelming
- **Accent Color**: Warm Gold (oklch(0.78 0.12 85)) - Used for highlights, selected states, and magical sparkle effects that add celebration and luxury
- **Supporting Colors**: Creamy Beige (oklch(0.95 0.01 75)) for backgrounds, Soft Silver (oklch(0.75 0.01 265)) for subtle UI elements
- **Foreground/Background Pairings**: 
  - Forest Green Background (oklch(0.35 0.08 155)): Cream text (oklch(0.95 0.01 75)) - Ratio 8.2:1 ✓
  - Cranberry Buttons (oklch(0.45 0.18 15)): White text (oklch(1 0 0)) - Ratio 5.1:1 ✓
  - Cream Background (oklch(0.95 0.01 75)): Forest Green text (oklch(0.35 0.08 155)) - Ratio 8.2:1 ✓
  - Gold Accent (oklch(0.78 0.12 85)): Forest Green text (oklch(0.35 0.08 155)) - Ratio 3.8:1 ✓

## Font Selection

Typography should balance festive character with excellent readability, combining a sophisticated serif for moments of elegance with a warm sans-serif for clarity.

- **Primary Font**: Playfair Display (serif) for titles and headings - brings sophistication and holiday elegance
- **Secondary Font**: Lato (sans-serif) for body text, UI labels, and game content - ensures clarity and modern friendliness
- **Typographic Hierarchy**:
  - H1 (Game Title): Playfair Display Bold / 48px / letter-spacing -0.02em
  - H2 (Phase Headers): Playfair Display Semibold / 32px / letter-spacing -0.01em  
  - Gibberish Text: Lato Bold / 28px / letter-spacing 0.03em / line-height 1.4
  - Player Names: Lato Semibold / 20px / letter-spacing 0.01em
  - Body/Labels: Lato Regular / 16px / letter-spacing normal / line-height 1.5
  - Buttons: Lato Bold / 18px / uppercase / letter-spacing 0.05em

## Animations

Animations should feel like gentle Christmas magic - sparkles, soft glows, and smooth transitions that enhance the cozy atmosphere rather than demanding attention.

- **Player Selection**: Smooth 2-second animation cycling through names with easing, ending with a gentle pulse and golden sparkle particles around selected name
- **Score Updates**: Numbers scale up slightly (1.2x) with a soft bounce, accompanied by small golden confetti particles (5-7 particles) that fade out
- **Page Transitions**: Gentle fade-in (300ms) combined with subtle upward slide (20px) for screen changes
- **Button Interactions**: Soft scale (0.98x on press) with color shift, gentle shadow increase on hover
- **Background Elements**: Ultra-subtle falling snowflakes (15 particles, slow drift, low opacity 0.3) that don't distract from content

## Component Selection

- **Components**: 
  - Button (primary for actions, outline for secondary) with custom gold/cranberry variants
  - Card for player seats and song display with subtle shadow and border radius
  - Input with custom forest green focus ring for name entry
  - Dialog for game end confirmation and leaderboard
  - Badge for player scores with gold background for leader
  - Separator for visual breaks between game phases
- **Customizations**: 
  - Custom PlayerSeat component showing avatar placeholder, name, and score with subtle glow on active
  - GibberishDisplay component with large, centered text and decorative corner elements
  - LeaderboardCard with tiered styling (gold/silver/bronze borders) for top 3
  - FloatingConfetti component using framer-motion for score celebrations
- **States**: 
  - Buttons have distinct hover (subtle scale + shadow), active (scale down), and disabled (reduced opacity) states
  - Player seats show inactive (muted), current turn (gold glow), and just-scored (brief green flash) states
  - Input fields have default, focus (gold ring), and error (red ring) states
- **Icon Selection**: 
  - Sparkles (phosphor) for magical moments and score updates
  - Crown (phosphor) for leaderboard winner
  - Play (phosphor) for start/reveal actions  
  - Users (phosphor) for player management
  - SkipForward (phosphor) for skipping songs
  - SignOut (phosphor) for ending game
- **Spacing**: 
  - Container padding: p-6 (24px) on mobile, p-8 (32px) on desktop
  - Component gaps: gap-4 (16px) for related elements, gap-8 (32px) for sections
  - Button padding: px-6 py-3 for primary actions, px-4 py-2 for secondary
  - Card padding: p-6 for content cards
- **Mobile**: 
  - Single column layout throughout
  - Larger touch targets (minimum 48px height) for buttons
  - Reduced font sizes: H1 to 36px, gibberish to 24px
  - Bottom-fixed action buttons for easy thumb reach
  - Simplified animations (reduce particle counts) for performance
