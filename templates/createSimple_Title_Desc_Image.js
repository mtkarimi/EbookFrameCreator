import * as textGeneration from '../textGeneration.js';
import { createImagePlaceholder } from '../frameGeneration.js';

export async function createSimple_Title_Desc_Image(texts, frame) {
    await textGeneration.loadFonts(); // Ensure fonts are loaded before creating text layers
    let yPos = 65; // Starting Y position

    let textLayerResult; // To capture the result from createTextLayer

    // Create the first text layer and update yPos based on its actual height
    if (texts.length > 0) {
        textLayerResult = await textGeneration.createTextLayer(texts[0], yPos, frame);
        yPos = textLayerResult.yPos; // Update yPos with the returned value
    }

    // Create the second text layer and update yPos similarly
    if (texts.length > 1) {
        textLayerResult = await textGeneration.createTextLayer(texts[1], yPos, frame);
        yPos = textLayerResult.yPos; // Update yPos with the returned value
    }

    // Now, yPos points to the position just below the second text layer
    let placeholderStartYPos = yPos + 20; // Adjust yPos for the start of the placeholder
    let heightAdjustment = frame.height - placeholderStartYPos - 88; // Calculate adjusted height for the placeholder

    // Check if the adjusted height is sufficient for the placeholder
    if (heightAdjustment >= 150) {
        // If the height is 150px or more, create the placeholder with the adjusted height
        createImagePlaceholder(frame, placeholderStartYPos, 486, heightAdjustment);
    }
    // If the adjusted height is less than 150px, you might decide not to create the placeholder or handle it differently
}
