#!/bin/bash

# Copy web_flask/static directory to web_dynamic/
cp -r web_flask/static web_dynamic/

# Copy web_flask/__init__.py to web_dynamic/
cp web_flask/__init__.py web_dynamic/

# Rename 100-hbnb.py to 0-hbnb.py in web_dynamic/
if [ -f "web_dynamic/100-hbnb.py" ]; then
    mv web_dynamic/100-hbnb.py web_dynamic/0-hbnb.py
fi

# Check if 100-hbnb.html exists in web_flask/templates/
if [ -f "web_flask/templates/100-hbnb.html" ]; then
    # If 100-hbnb.html exists, copy it to web_dynamic/ and rename it to 0-hbnb.html
    cp web_flask/templates/100-hbnb.html web_dynamic/0-hbnb.html
else
    # If 100-hbnb.html does not exist, copy 8-hbnb.html to web_dynamic/ and rename it to 0-hbnb.html
    cp web_flask/templates/8-hbnb.html web_dynamic/0-hbnb.html
fi

# Update 0-hbnb.py to replace the existing route to /0-hbnb/
sed -i 's@app.route("/100-hbnb/")@app.route("/0-hbnb/")@' web_dynamic/0-hbnb.py

# Add a variable cache_id to render_template in 0-hbnb.py
cache_id=$(python3 -c 'import uuid; print(uuid.uuid4())')
sed -i "s@app.route(\"/0-hbnb/\")@app.route(\"/0-hbnb/?cache_id=$cache_id\")@" web_dynamic/0-hbnb.py

# Add cache_id as a query string to each <link> tag URL in 0-hbnb.html
sed -i "s@../static/@../static/?cache_id=$cache_id@g" web_dynamic/0-hbnb.html

echo "Script executed successfully."
