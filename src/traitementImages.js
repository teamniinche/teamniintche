
// Fonction pour convertir l'image en base64
export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
                                              const reader = new FileReader();
                                              reader.onload = () => resolve(reader.result);
                                              reader.onerror = error => reject(error);
                                              reader.readAsDataURL(file);
                                          });
}

// Fonction pour compresser l'image et convertir en JPEG
export const compressImage = async (base64Image,quality,wH) => {
            const image = new Image();
            image.src = base64Image;

            return new Promise((resolve) => {
                      image.onload = () => {
                                              const canvas = document.createElement("canvas");
                                              const ctx = canvas.getContext("2d");
                                              let height=wH,width =wH 
                                              canvas.width = width;canvas.height = height;
                                              ctx.drawImage(image, 0, 0, width, height);
                                              // Convertir en jpeg avec une qualité de QUALITY
                                              const compressedBase64 = canvas.toDataURL("image/jpg", quality);
                                              resolve(compressedBase64);
                                            };
                      });
            };
// Fonction pour convertir l'image comprssée en file
export const dataURLtoFile = (dataURL, fileName) => {
              const arr = dataURL.split(',');
              const mime = arr[0].match(/:(.*?);/)[1];
              const bstr = atob(arr[1]);
              let n = bstr.length;
              const u8arr = new Uint8Array(n);
          
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
          
              return new File([u8arr], fileName, { type: mime });
            }