import React, { useState } from 'react';
import { createReport } from 'docx-templates';

const ContractModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [placeholders, setPlaceholders] = useState({});

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const buffer = await selectedFile.arrayBuffer();
      const template = await createReport({
        template: buffer,
        cmdDelimiter: ['{', '}'],
        processLineBreaks: true,
      });
      setText(template.content);
      const placeholders = {};
      template.placeholders.forEach((placeholder) => {
        placeholders[placeholder] = '';
      });
      setPlaceholders(placeholders);
    }
  };

  const handleInputChange = (e, placeholder) => {
    setPlaceholders({
      ...placeholders,
      [placeholder]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const buffer = await file.arrayBuffer();
    const output = await createReport({
      template: buffer,
      cmdDelimiter: ['{', '}'],
      processLineBreaks: true,
      data: placeholders,
    });
    const blob = new Blob([output], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'filled_contract.docx';
    link.click();
  };

  return (
    <div className="product-details-modal">
      <div className="product-details-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Загрузите договор</h2>
        <input type="file" accept=".docx" onChange={handleFileChange} />
        {text && (
          <div>
            <h3>Текст договора:</h3>
            <pre>{text}</pre>
            <h3>Заполните поля:</h3>
            {Object.keys(placeholders).map((placeholder) => (
              <div key={placeholder}>
                <label>{placeholder}:</label>
                <input
                  type="text"
                  value={placeholders[placeholder]}
                  onChange={(e) => handleInputChange(e, placeholder)}
                />
              </div>
            ))}
            <button onClick={handleSubmit}>Сохранить</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractModal;