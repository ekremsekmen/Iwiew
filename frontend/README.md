    const fetchQuestionPackages = async () => {
        // Fetch question packages as before
        try {
        const { data } = await getQuestionPackages();
        setQuestionPackages(data);
        } catch (error) {
        console.error('Failed to fetch question packages', error);
        }
    };

<br/>

bu kod yokken de varken de bi farki yok `Interview.jsx`