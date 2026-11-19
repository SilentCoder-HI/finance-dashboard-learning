export const fetchCompanyusers = async () => {
    try {
        const response = await fetch(`http://localhost:2000/api/users`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    }
    catch (e) {
        console.error("Error fetching users:", e);
    }
}