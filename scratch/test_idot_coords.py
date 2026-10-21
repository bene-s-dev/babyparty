from PIL import ImageFont, Image, ImageDraw

font = ImageFont.truetype('scratch/kristi.ttf', 64)

# Create an image rendering "Alina"
img = Image.new('L', (300, 100), 0)
draw = ImageDraw.Draw(img)
# In German: center at x=165, y=65.
# With font size 64:
# Let's find exact coordinates of all non-zero pixels of the i-dot!
bbox = font.getbbox('Alina')
text_w = bbox[2] - bbox[0]
print(f"Total Alina width: {text_w}")

# In SVG: <text x="165" y="65" text-anchor="middle">
# text-anchor="middle" places the start at x = 165 - (text_w / 2)
start_x_de = 165 - (text_w / 2)
# Baseline is y=65. In PIL, draw.text((start_x_de, y_top))
# For Kristi at 64px, ascent is ~51px, let's find baseline offset
ascent, descent = font.getmetrics()
print(f"ascent: {ascent}, descent: {descent}")

# Let's render at (start_x_de, 65 - ascent) so baseline is exactly at y=65:
y_pos = 65 - ascent
draw.text((start_x_de, y_pos), 'Alina', font=font, fill=255)

# Now find all pixels corresponding to the i-dot (it's between x=150 and x=175, y between 20 and 50)
dot_pixels = []
stem_pixels = []
for y in range(20, 70):
    for x in range(150, 180):
        if img.getpixel((x, y)) > 100:
            if y < 45:
                dot_pixels.append((x, y))
            else:
                stem_pixels.append((x, y))

dot_xs = [p[0] for p in dot_pixels]
dot_ys = [p[1] for p in dot_pixels]
print(f"German i-dot bounds: x=({min(dot_xs)}, {max(dot_xs)}), y=({min(dot_ys)}, {max(dot_ys)})")
center_x_de = (min(dot_xs) + max(dot_xs)) / 2
center_y_de = (min(dot_ys) + max(dot_ys)) / 2
print(f"German i-dot center: ({center_x_de:.1f}, {center_y_de:.1f})")

# Now for English: center at x=200, y=65:
start_x_en = 200 - (text_w / 2)
center_x_en = start_x_en + (center_x_de - start_x_de)
center_y_en = center_y_de
print(f"English i-dot center: ({center_x_en:.1f}, {center_y_en:.1f})")
