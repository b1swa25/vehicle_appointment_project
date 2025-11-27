const API_URL = "https://script.google.com/macros/s/AKfycbzigT6EJmu6TeRfHe2Djm2wRgVu7GlLo36vLupeObVMHc6JF2wfzjEE5OhfKcMqg_NfbA/exec";

document.getElementById("apptForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    const row = [
        Date.now(),
        data.name,
        data.phone,
        data.vehicle,
        data.date,
        data.time,
        "Pending",
        new Date().toISOString()
    ];

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                action: "create",
                sheet: "appointments",
                data: row
            })
        });

        const out = await res.json();

        if (out.success || out.result) {
            document.getElementById("success").style.display = "block";
            document.getElementById("error").style.display = "none";
            form.reset();
        } else {
            throw new Error();
        }
    } catch {
        document.getElementById("error").style.display = "block";
        document.getElementById("success").style.display = "none";
    }
});
