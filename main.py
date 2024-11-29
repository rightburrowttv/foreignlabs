from flask import Flask, make_response, redirect, render_template
import os, sys

app = Flask(__name__, static_folder="www", static_url_path="/")
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.get("/")
def Index():
    return render_template("index.html")

@app.get("/echo")
def Echo():
    return render_template("echo.html")

app.run(host="0.0.0.0", port=8080)