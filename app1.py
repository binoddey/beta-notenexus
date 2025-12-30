from flask import Flask, render_template, request, redirect, session, url_for
import json

app = Flask(__name__)
app.secret_key = "notenexus_super_secret_key"

# Load whitelist
def load_whitelist():
    with open("beta-whitelist.json", "r") as f:
        return json.load(f)["approved_emails"]

# -------------------------
# BETA GATE (ENTRY POINT)
# -------------------------
@app.route("/", methods=["GET", "POST"])
def beta_gate():
    if request.method == "POST":
        email = request.form.get("email").strip().lower()
        whitelist = load_whitelist()

        if email in whitelist:
            session["beta_user"] = email
            return redirect(url_for("dashboard"))
        else:
            return redirect(url_for("waitlist"))

    return render_template("beta_gate.html")

# -------------------------
# WAITLIST PAGE
# -------------------------
@app.route("/waitlist")
def waitlist():
    return render_template("restricted.html")

# -------------------------
# PROTECTED DASHBOARD
# -------------------------
@app.route("/dashboard")
def dashboard():
    if "beta_user" not in session:
        return redirect(url_for("beta_gate"))

    return render_template("dashboard.html")

# -------------------------
# LOGOUT (OPTIONAL)
# -------------------------
@app.route("/logout")
def logout():
    session.pop("beta_user", None)
    return redirect(url_for("beta_gate"))

if __name__ == "__main__":
    app.run(debug=True)
