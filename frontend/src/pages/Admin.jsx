import React, { useEffect, useState } from 'react';
import useQuestionStore from '../store/questionStore';
import useAuthStore from '../store/authStore';
import Sidebar from '../components/Sidebar';
import '../styles/Admin.css';

const Admin = () => {
  const {
    questionPackages,
    loading,
    error,
    fetchQuestionPackages,
    addQuestionPackage,
    updateQuestionPackage,
    deleteQuestionPackage,
  } = useQuestionStore();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageName, setPackageName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [questionDuration, setQuestionDuration] = useState('');
  const [newPackageName, setNewPackageName] = useState('');
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    fetchQuestionPackages(); // Fetch question packages on component mount
  }, []);

  const handleDeleteQuestion = async (packageId, questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    await updateQuestionPackage(packageId, { questions: updatedQuestions });
    setQuestions(updatedQuestions);
  };

  const handleDeletePackage = async (id) => {
    await deleteQuestionPackage(id);
    setSelectedPackage(null);
  };

  const handleUpdate = async (id) => {
    const updatedData = { packageName, questions };
    await updateQuestionPackage(id, updatedData);
    setPackageName('');
    setQuestions([]);
    setSelectedPackage(null);
  };

  const handleCreatePackage = async () => {
    const newPackage = { packageName: newPackageName, questions: [] };
    await addQuestionPackage(newPackage);
    setNewPackageName('');
  };

  const handleUpdateQuestions = (id) => {
    const currentPackage = questionPackages.find((pkg) => pkg._id === id);
    if (currentPackage) {
      setSelectedPackage(id);
      setPackageName(currentPackage.packageName);
      setQuestions(currentPackage.questions);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion && questionDuration) {
      setQuestions([...questions, { text: newQuestion, duration: questionDuration }]);
      setNewQuestion('');
      setQuestionDuration('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <h1 className="admin-header">Admin Panel</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="admin-content">
        <h2>Yeni Soru Paketi Ekle</h2>
        <input
          type="text"
          value={newPackageName}
          onChange={(e) => setNewPackageName(e.target.value)}
          placeholder="Paket adı"
          className="input-full"
        />
        <button onClick={handleCreatePackage} className="button-primary mt-2">
          Ekle
        </button>

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
            {questionPackages.map((pkg) => (
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
                          <button
                            onClick={() => handleDeleteQuestion(pkg._id, index)}
                            className="button-primary bg-red-500 hover:bg-red-600 mt-2"
                          >
                            Soru Sil
                          </button>
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
                        <button onClick={handleAddQuestion} className="button-primary mt-2">
                          Ekle
                        </button>
                      </div>
                    </div>
                  ) : (
                    pkg.questions.map((q, i) => (
                      <div key={i}>
                        {q.text} - {q.duration} dakika
                      </div>
                    ))
                  )}
                </td>
                <td className="table-actions">
                  {selectedPackage === pkg._id ? (
                    <button onClick={() => handleUpdate(pkg._id)} className="button-primary">
                      Kaydet
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedPackage(pkg._id);
                        setPackageName(pkg.packageName);
                        handleUpdateQuestions(pkg._id);
                      }}
                      className="button-primary"
                    >
                      Düzenle
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletePackage(pkg._id)}
                    className="button-primary bg-red-500 hover:bg-red-600"
                  >
                    Paketi Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleLogout} className="button-primary mt-4">
        Logout
      </button>
    </div>
  );
};

export default Admin;
