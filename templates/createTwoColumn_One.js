import * as textGeneration from '../textGeneration.js';
import { createImagePlaceholder } from '../frameGeneration.js';

export async function createTwoColumn_One(texts, frame) {
    await textGeneration.loadFonts(); // Ensure fonts are loaded before creating text layers
    
    let yPos = 65; // Starting Y position for the title
    let textLayerResult;
    // Create the title with bold style
    if (texts.length > 0) {
        textLayerResult = await textGeneration.createTextLayer(`**${texts[0]}**`, yPos, frame, false, frame.width - 110, "**");
        yPos = textLayerResult.yPos ; // Adjust space after the title
    }
    let columnCreationResult;
    // Create two columns for the next two lines of text
    if (texts.length > 2) {
        const columnWidths = [230, 230]; // Width for both columns
        const columnXOffsets = [55, 340]; // X offset for the second column assumes a 55 margin and a 45 margin between columns
        const styles = ["", ""]; // No specific styles for these texts
        
        // Call createColumnTextLayers for the second and third lines
        columnCreationResult = await textGeneration.createColumnTextLayers([texts[1], texts[2]], yPos, frame, columnWidths, columnXOffsets, styles);
        yPos = columnCreationResult.yPos; // Update yPos with the returned value

    }
    let placeholderHeight = frame.height - yPos - 55; // Adjust based on yPos and bottom margin

    if (placeholderHeight >= 150) {
        // If the height is 150px or more, create the placeholder with the adjusted height
    createImagePlaceholder(frame, yPos, frame.width - 110, Math.max(150, placeholderHeight)); // Ensure a minimum height
    }
    
    // After the text layers, calculate the dynamic height for the placeholder
}
