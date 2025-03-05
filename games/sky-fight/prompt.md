Create a single HTML file for a 'Sky Fight 3D' game using HTML5 canvas with the following specifications:

- **Game Setup**: Player airplane stays at the bottom, moves left/right with arrow keys or touch controls. Enemies spawn from the top with a pseudo-3D effect (scaling by Z-depth, 0 at player, 300 at top). Canvas is responsive (max 800x600, scales to screen size).

- **Controls**: Left/Right arrows (or touch) move player, Up/Down arrows adjust speed (1 to 10, base 5), Space fires rockets (if available), A key uses boomshell. Automatic bullets fire every 200ms.

- **Player**: Beautiful airplane with curved body (blue gradient #1E90FF to #00BFFF), metallic wings (gray gradient #A9A9A9 to #D3D3D3), gold tail (#FFD700), glass cockpit (rgba(135, 206, 250, 0.7)), pulsating orange exhaust (rgba(255, 165, 0, 0.5)). Starts with 3 health, red health bar above. Bullet streams start at 1, +1 every 2 levels.

- **Enemies**: Two types: Regular (40x60, 10 points) and Big (60x90, 50 points, 20% spawn chance, 70% speed). Red with 3D effect (gradient #8B0000 to #CD5C5C). Speed: base 0.5, +0.1 per level. Health: Level 1 = 1 bullet, +1 per level (big = double), green health bar above.

- **Weapons**: Bullets (auto, 1 damage), Rockets (5 every 30s, 3 damage, gold), Boomshell (1 per level, clears screen).

- **Levels**: Level 1 (0-99), Level 2 (100-249), Level 3 (250-449), Level 4 (450+). Adjust difficulty and bullet streams on level change.

- **Effects**: Explosion on enemy destruction (10 particles regular, 20 big, orange/yellow, fade out). Sounds via Web Audio API: Bullet (800 Hz, 0.1s), Rocket (200 Hz, 0.3s), Boomshell (100 Hz, 0.5s), Explosion (300 Hz, 0.2s).

- **UI**: Display 'Score: X - Level: Y - Health: Z - Rockets: W - Boomshell: V'. Centered restart button on game over. Mobile touch controls (Left, Right, Rocket, Boomshell) below 600px width.

Ensure all code (HTML, CSS, JS) is in one file, responsive, and includes the explosion and sound effects.