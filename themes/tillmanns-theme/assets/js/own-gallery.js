window.onload = function() {
    // Get all gallery containers
    const containers = document.getElementsByClassName('own-gallery');

    // Loop through each gallery container
    Array.from(containers).forEach(container => {
        const images = container.getElementsByTagName('img');
        let totalAspectRatio = 0;

        // Calculate the total aspect ratio of all images
        for (const img of images) {
            if (img.complete) {
                totalAspectRatio += img.naturalWidth / img.naturalHeight;
            } else {
                // If the image is not loaded, wait for it to load before calculating
                img.onload = () => {
                    window.onload();
                };
                // Return early since we need to wait for all images to load
                return;
            }
        }

        // Calculate the height that all images will need to be to fit in the row
        const rowHeight = container.clientWidth / totalAspectRatio;

        // Apply the calculated height and corresponding width to each image
        for (const img of images) {
            img.style.height = `${rowHeight}px`;
            img.style.width = `${rowHeight * (img.naturalWidth / img.naturalHeight)}px`;
        }
    });
};
