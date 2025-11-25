window.onload = calcMediaGallery;
window.onresize = calcMediaGallery;

function calcMediaGallery() {
    const containers = document.getElementsByClassName('own-gallery');

    Array.from(containers).forEach(container => {
        const media_elements = container.querySelectorAll('.media');
        const min_row_height = container.dataset.rowheight;

        const max_width = container.clientWidth;
        let row_width = 0;

        let row_elements = [];
        let current_row_height = min_row_height;

        for (const media_element of media_elements) {
            if (media_element.tagName.toLowerCase() === 'img' || media_element.tagName.toLowerCase() === 'video') {
                const { width, height } = getDimensions(media_element, min_row_height);
                const media_element_width = width;
                const media_element_height = height;

                if ((row_width + media_element_width) >= max_width) {
                    scale_row(row_elements, row_width, max_width, current_row_height);
                    row_width = 0;
                    row_elements = [];
                    current_row_height = min_row_height;
                }

                row_width += media_element_width;
                row_elements.push(media_element);

                //media_element.style.width = media_element_width + "px";
                //media_element.style.height = media_element_height + "px";
            }
        }

        // Scale last row
        scale_row(row_elements, row_width, max_width, current_row_height);
    });
}

function getDimensions(element, targetHeight) {
    let width, height;
    if (element.tagName.toLowerCase() === 'img') {
        width = element.naturalWidth * targetHeight / element.naturalHeight;
        height = targetHeight;
    } else if (element.tagName.toLowerCase() === 'video') {
        width = element.videoWidth * targetHeight / element.videoHeight;
        height = targetHeight;
    }
    return { width, height };
}

function scale_row(elements, row_width, max_width, row_height) {
    const scale = max_width / row_width; // Get factor how much the normalized row has to be scaled.
    const new_row_height = row_height * scale - 1;

    for (const element of elements) { // Apply scaling to all elements in row
        const { width: new_element_width, height: new_element_height } = getDimensions(element, new_row_height);

        element.parentElement.style.width = new_element_width + "px";
        element.parentElement.style.height = new_element_height + "px";
    }
}

