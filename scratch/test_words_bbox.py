from PIL import ImageFont

f_kristi = ImageFont.truetype('scratch/kristi.ttf', 64)
f_caveat = ImageFont.truetype('scratch/caveat.ttf', 42)
f_caveat_yours = ImageFont.truetype('scratch/caveat.ttf', 44)

print("German:")
print("Eure:", f_kristi.getbbox("Eure"))
print("Alina:", f_kristi.getbbox("Alina"))
print("und:", f_caveat.getbbox("und"))
print("Euer:", f_caveat.getbbox("Euer"))
print("Kevin:", f_caveat.getbbox("Kevin"))

print("\nEnglish:")
print("Yours,:", f_caveat_yours.getbbox("Yours,"))
print("Alina:", f_kristi.getbbox("Alina"))
print("&:", f_caveat.getbbox("&"))
print("Kevin:", f_caveat.getbbox("Kevin"))
