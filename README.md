# Swifttalk
# Django Real-Time Chat Application

A real-time chat application built with Django, Django Channels, and Redis for WebSocket communication. The application supports group chat rooms, custom bot integration, and user authentication.

## Features

- Real-time messaging using WebSocket connections
- User authentication and registration
- Custom chat room creation and management
- Bot integration system with custom commands
- Cursor-based pagination for message history
- REST API endpoints for user and chat operations
- Redis channel layer for message broadcasting

## Technology Stack

- Django 4.1.3
- Django Channels 4.0.0
- Django REST Framework 3.14.0
- Redis 4.4.0
- MySQL Database
- Daphne ASGI Server
- WebSocket Protocol

## Prerequisites

- Python 3.x
- Redis Server
- MySQL Server
- Virtual Environment (recommended)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure your MySQL database in `settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sample',
        'USER': 'root',
        'PASSWORD': 'your-password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

5. Configure Redis connection in `settings.py`:
```python
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [('localhost', 8000)],
        }
    },
}
```

6. Run migrations:
```bash
python manage.py migrate
```

7. Create a superuser:
```bash
python manage.py createsuperuser
```

8. Start the development server:
```bash
python manage.py runserver
```

