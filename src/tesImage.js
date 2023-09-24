import React, { useState } from 'react';

export default function CompressionImage() {
  const [image, setImage] = useState(null);
  const [imageWeight, setImageWeight] = useState(null);//poids image


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
                              const img = new Image();
                              img.src = e.target.result;

                              img.onload = () => {
                                                    const canvas = document.createElement('canvas');
                                                    const ctx = canvas.getContext('2d');

                                                    const maxWidth = 800; // Largeur maximale souhaitée
                                                    const maxHeight = 800; // Hauteur maximale souhaitée

                                                    let width = img.width;
                                                    let height = img.height;

                                                    if (width > height) {
                                                            if (width > maxWidth) {
                                                              height *= maxWidth / width;
                                                              width = maxWidth;
                                                            }
                                                    } else {
                                                            if (height > maxHeight) {
                                                              width *= maxHeight / height;
                                                              height = maxHeight;
                                                            }
                                                    }

                                                    canvas.width = width;
                                                    canvas.height = height;

                                                    ctx.drawImage(img, 0, 0, width, height);

                                                    canvas.toBlob((blob) => {
                                                                                const compressedImage = URL.createObjectURL(blob);
                                                                                setImage(compressedImage);
                                                                            }, 'image/jpeg', 0.5); // Qualité de compression (entre 0 et 1)
                                                  
                                                  };
                            };
     // Récupérer le poids du fichier
    // poids de l'image
    const weightInBytes = file.size;
    const weightInKilobytes = weightInBytes / 1024;
    const weightInMegabytes = weightInKilobytes / 1024;

    // Formater le poids pour l'affichage
    const formattedWeight = weightInMegabytes.toFixed(2) + ' MB';
    setImageWeight(formattedWeight);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Compressée" />}
      {imageWeight && <p>Poids de l'image : {imageWeight}</p>}
    </div>
  );
}

export function RedimensionnementImage() {
  const [image, setImage] = useState(null);
  const [imageWeight, setImageWeight] = useState(null);//poids image


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Récupérer le poids du fichier
    // poids de l'image
    const weightInBytes = file.size;
    const weightInKilobytes = weightInBytes / 1024;
    const weightInMegabytes = weightInKilobytes / 1024;

    // Formater le poids pour l'affichage
    const formattedWeight = weightInMegabytes.toFixed(2) + ' MB';
    setImageWeight(formattedWeight);
// fin poids image
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxWidth = 500; // Largeur maximale souhaitée
        const maxHeight = 500; // Hauteur maximale souhaitée

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        const resizedImage = canvas.toDataURL('image/jpeg');
        setImage(resizedImage);
      };
    };

    reader.readAsDataURL(file);
    
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Redimensionnée" />}
      
      {imageWeight && <p>Poids de l'image : {imageWeight}</p>}
      <CompressionImage/>
    </div>
  );
}
