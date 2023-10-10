import os
from app import create_app


app = create_app()

if __name__ == '__main__':
    app.config.from_object(os.environ['CONFIGURATION_SETUP'])
    app.run(host='0.0.0.0', port=app.config['PORT'])