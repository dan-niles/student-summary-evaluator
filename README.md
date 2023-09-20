DSE PROJECT
------------

INSTALLATION
------------

Open command line and run the following commands to setup
1. `https://github.com/dan-niles/dse-project-frontend.git`
2. `cd dse-project-frontend`

To install frontend
1. `cd backend`
2. `npm install`

To install backend
1. `cd frontend`
2. `pipenv shell`  (Note: if you havent install it install pipenv using `pip install pipenv `)
3. `pipenv install`

RUN
---

Start backend
1. `cd backend`
2. `pyhton manage.py runserver`

Start frontend
1. `cd frontend`
2. `npm start`

---

Under construction :(


* make sure to delete all the files in migration except __init__.py file in backend to startover.


* Note that this would work for local database so create the relevent database schema given the data you want to edit in setting.py
in setting.py under DATABASES add



        'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'freedb_DSE project',
        'HOST': 'sql.freedb.tech',
        'USER': 'freedb_dse_project',
        'PASSWORD': 'Z!u8Pmpu6&ECe9X'
    }

