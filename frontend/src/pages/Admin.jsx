import React, { useEffect, useState } from 'react';
import { getAllQuestionPackages, createQuestionPackage, updateQuestionPackage, deleteQuestionPackage } from '../services/questionService';
import '../styles/Admin.css';

const Admin = () => {
  const [questionPackages, setQuestionPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageName, setPackageName] = useState("");
  const [questions, setQuestions] = useState([]); 
  const [newQuestion, setNewQuestion] = useState(""); 
  const [questionDuration, setQuestionDuration] = useState(""); 
  const [newPackageName, setNewPackageName] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await getAllQuestionPackages();
      setQuestionPackages(response.data);
    };
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteQuestionPackage(id);
      setQuestionPackages(questionPackages.filter(pkg => pkg._id !== id));
    } catch (error) {
      console.error("Silme işleminde hata:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedData = { packageName, questions };
      await updateQuestionPackage(id, updatedData);
      setQuestionPackages(questionPackages.map(pkg => 
        pkg._id === id ? { ...pkg, packageName, questions } : pkg
      ));
      setPackageName("");
      setQuestions([]);
      setSelectedPackage(null);
    } catch (error) {
      console.error("Güncelleme işleminde hata:", error);
    }
  };

  const handleCreatePackage = async () => {
    try {
      const newPackage = { packageName: newPackageName, questions: [] };
      const response = await createQuestionPackage(newPackage);
      setQuestionPackages([...questionPackages, response.data]);
      setNewPackageName("");
    } catch (error) {
      console.error("Paket oluşturma işleminde hata:", error);
    }
  };

  const handleUpdateQuestions = (id) => {
    const currentPackage = questionPackages.find(pkg => pkg._id === id);
    if (currentPackage) {
      setSelectedPackage(id);
      setQuestions(currentPackage.questions);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion && questionDuration) {
      setQuestions([...questions, { text: newQuestion, duration: questionDuration }]);
      setNewQuestion("");
      setQuestionDuration("");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-header">Manage Question Package</h1>
      
      <div className="admin-content">
        <h2>Yeni Soru Paketi Ekle</h2>
        <input
          type="text"
          value={newPackageName}
          onChange={(e) => setNewPackageName(e.target.value)}
          placeholder="Paket adı"
          className="input-full"
        />
        <button onClick={handleCreatePackage} className="button-primary mt-2">Ekle</button>

        <h2 className="mt-4">Soru Paketleri</h2>
        <table className="table mt-2">
          <thead>
            <tr>
              <th>Paket Adı</th>
              <th>Sorular</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {questionPackages.map(pkg => (
              <tr key={pkg._id}>
                <td>
                  {selectedPackage === pkg._id ? (
                    <input
                      type="text"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      className="input-full"
                    />
                  ) : (
                    pkg.packageName
                  )}
                </td>
                <td>
                  {selectedPackage === pkg._id ? (
                    <div>
                      {questions.map((question, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                          <input
                            type="text"
                            value={question.text}
                            onChange={(e) => {
                              const updatedQuestions = [...questions];
                              updatedQuestions[index].text = e.target.value;
                              setQuestions(updatedQuestions);
                            }}
                            placeholder="Soru metni"
                            className="input-full"
                          />
                          <input
                            type="number"
                            value={question.duration}
                            onChange={(e) => {
                              const updatedQuestions = [...questions];
                              updatedQuestions[index].duration = e.target.value;
                              setQuestions(updatedQuestions);
                            }}
                            placeholder="Süre (dakika)"
                            className="input-full"
                          />
                        </div>
                      ))}
                      <div className="flex flex-col mt-2">
                        <input
                          type="text"
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          placeholder="Yeni soru ekle"
                          className="input-full"
                        />
                        <input
                          type="number"
                          value={questionDuration}
                          onChange={(e) => setQuestionDuration(e.target.value)}
                          placeholder="Süre (dakika)"
                          className="input-full"
                        />
                        <button onClick={handleAddQuestion} className="button-primary mt-2">Ekle</button>
                      </div>
                    </div>
                  ) : (
                    pkg.questions.map((q, i) => (
                      <div key={i}>{q.text} - {q.duration} dakika</div>
                    ))
                  )}
                </td>
                <td className="table-actions">
                  {selectedPackage === pkg._id ? (
                    <button onClick={() => handleUpdate(pkg._id)} className="button-primary">Kaydet</button>
                  ) : (
                    <button onClick={() => { 
                      setSelectedPackage(pkg._id); 
                      setPackageName(pkg.packageName); 
                      handleUpdateQuestions(pkg._id); 
                    }} className="button-primary">Düzenle</button>
                  )}
                  <button onClick={() => handleDelete(pkg._id)} className="button-primary bg-red-500 hover:bg-red-600">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
