from fastapi import APIRouter, HTTPException
import json
import os

config_route = APIRouter(tags=["Config"])

CONFIG_PATH = "/app/config"


@config_route.get("/config")
async def get_config():
    branding_path = os.path.join(CONFIG_PATH, "branding.json")
    if not os.path.exists(branding_path):
        raise HTTPException(
            status_code=404, detail="Branding configuration not found"
        )
    with open(branding_path, "r") as f:
        return json.load(f)


@config_route.get("/dashboard")
async def get_dashboard():
    dashboard_path = os.path.join(CONFIG_PATH, "dashboard.json")
    if not os.path.exists(dashboard_path):
        raise HTTPException(
            status_code=404, detail="Dashboard configuration not found"
        )
    with open(dashboard_path, "r") as f:
        return json.load(f)


@config_route.get("/geo/{filename}")
async def get_geo(filename: str):
    geo_path = os.path.join(CONFIG_PATH, "geo", filename)
    if not os.path.exists(geo_path):
        raise HTTPException(status_code=404, detail="GIS file not found")
    with open(geo_path, "r") as f:
        return json.load(f)
