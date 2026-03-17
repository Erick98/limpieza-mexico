const Jimp = require('jimp');

async function overlayLogo() {
  try {
    const mainImagePath = process.argv[2];
    const logoPath = process.argv[3];
    const outputPath = process.argv[4];

    console.log(`Loading main image: ${mainImagePath}`);
    const mainImage = await Jimp.read(mainImagePath);
    
    console.log(`Loading logo: ${logoPath}`);
    const logo = await Jimp.read(logoPath);

    // Calculate new width for logo (e.g., 25% of the main image width)
    const targetWidth = Math.floor(mainImage.bitmap.width * 0.25);
    logo.resize(targetWidth, Jimp.AUTO);

    // Padding from the edge
    const padding = 40;

    // We'll place it in the bottom right corner
    const x = mainImage.bitmap.width - logo.bitmap.width - padding;
    const y = mainImage.bitmap.height - logo.bitmap.height - padding;

    console.log(`Compositing logo at x: ${x}, y: ${y}`);
    mainImage.composite(logo, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1.0,
      opacityDest: 1.0
    });

    console.log(`Saving to: ${outputPath}`);
    await mainImage.writeAsync(outputPath);
    console.log("Success!");
  } catch (error) {
    console.error("Error formatting image:", error);
  }
}

overlayLogo();
