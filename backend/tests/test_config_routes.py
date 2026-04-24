from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


class TestConfigRoutes:
    def test_get_config(self):
        response = client.get("/v1/config")
        assert response.status_code == 200
        data = response.json()
        assert "client_name" in data
        assert "theme" in data

    def test_get_dashboard(self):
        response = client.get("/v1/dashboard")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list) or isinstance(data, dict)
