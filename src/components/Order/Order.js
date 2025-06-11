import React from 'react';
import style from './Order.module.scss';
import { faPaperPlane, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useImageUploader from './attachPhoto';
import { useOrderLogic } from './OrderLogic';

export default function Order() {
  const {
    previewImages,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    triggerFileInput,
    maxFiles
  } = useImageUploader(5);

  const { submitOrder, loading, error, success } = useOrderLogic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const files = previewImages.map(img => img.file);

    const orderData = {
      projectName: form.projectName.value,
      projectDate: form.projectDate.value,
      description: form.description.value,
      files: files
    };

    try {
      await submitOrder(orderData);
      form.reset();
      previewImages.forEach(img => URL.revokeObjectURL(img.src));
      fileInputRef.current.value = '';
    } catch (err) {
      console.error('Ошибка при отправке заказа:', err);
    }
  };

  return (
    <div className={style.Order}>
      <div className='container'>
        <div className={style.compact_order}>
          <h2 className={style.title}>Заказать проект</h2>

          {error && <div className={style.error}>
            {error.includes('<!DOCTYPE html>') ? 'Ошибка сервера' : error}
          </div>}
          
          {success && <div className={style.success}>Заказ успешно отправлен!</div>}

          <form className={style.compact_form} onSubmit={handleSubmit}>
            <div className={style.form_row}>
              <input 
                type="text" 
                name="projectName"
                className={style.input} 
                placeholder="Название проекта" 
                required
              />
              <input 
                type="date" 
                name="projectDate"
                className={style.input} 
                placeholder="Дата" 
                required
              />
            </div>
            
            <div className={style.desc}>
              <textarea 
                name="description"
                placeholder="Описание проекта (необязательно)"
              ></textarea>
            </div>

            <div className={style.file_upload}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*"
                className={style.hidden_input}
              />
              
              <button
                type="button"
                onClick={triggerFileInput}
                className={style.attach_photo}
                disabled={previewImages.length >= maxFiles}
              >
                <FontAwesomeIcon icon={faCamera}/> Прикрепить фото
                <span> до {maxFiles} файлов</span>
              </button>

              {previewImages.length > 0 && (
                <div className={style.preview_container}>
                  {previewImages.map((image) => (
                    <div key={image.id} className={style.preview_item}>
                      <img
                        src={image.src}
                        alt="Превью"
                        className={style.preview_image}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image.id)}
                        className={style.remove_button}
                      >
                        <FontAwesomeIcon icon={faTimes} className={style.remove_image}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className={style.submit_btn}
              disabled={loading}
            >
              {loading ? 'Отправка...' : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} /> Отправить
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}