export const fetchCompanyusers = async (compID: string) => {
    try {
        const response = await fetch(`http://localhost:2000/api/companies/${compID}`, {
            method: "GET",
            credentials: "include", // harmless now, needed when the token cookie exists
        });
        const data = response.json()
    }
    catch (e) {
        console.error(e)
    }
}