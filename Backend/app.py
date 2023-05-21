from flask import Flask
import subprocess


app = Flask(__name__)

@app.route('/execute_cache')
def execute_script():
    script_path = 'cache.py' 
    
    try:
        subprocess.run(['python3', script_path], check=True)
        return 'Script executed successfully!'
    except subprocess.CalledProcessError as e:
        return f'An error occurred while executing the script: {e}'
    
    
if __name__ == '__main__':
    app.run(debug=True)