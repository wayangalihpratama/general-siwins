import os
import json
from enum import Enum

INSTANCE_NAME = os.getenv("SIWINS_INSTANCE", "test")
CONFIG_PATH = "/app/config"
MAPPING_FILE = f"{CONFIG_PATH}/mapping.json"

# Load mapping data
with open(MAPPING_FILE, "r") as f:
    MAPPING = json.load(f)


class QuestionConfig(Enum):
    year_conducted = MAPPING["questions"]["year_conducted"]
    school_information = MAPPING["questions"]["school_information"]
    school_type = MAPPING["questions"]["school_type"]
    school_category = MAPPING["questions"]["school_category"]


class SchoolInformationEnum(Enum):
    province = MAPPING["schoolInformation"]["province"]
    school_type = MAPPING["schoolInformation"]["school_type"]
    school_name = MAPPING["schoolInformation"]["school_name"]
    school_code = MAPPING["schoolInformation"]["school_code"]
    school_category = MAPPING["schoolInformation"]["school_category"]


class CascadeLevels(Enum):
    school_information = MAPPING["cascades"]["school_information"]["levels"]


class CascadeNames(Enum):
    school_information = MAPPING["cascades"]["school_information"]["names"]


class SchoolTypeRanking(Enum):
    has_ranking = MAPPING["schoolTypeRanking"]["has_ranking"]
    rankings = MAPPING["schoolTypeRanking"]["rankings"]


class ResponseGrouperCustomConfig(Enum):
    water = MAPPING["responseGrouper"]["water"]
    sanitation = MAPPING["responseGrouper"]["sanitation"]
    hygiene = MAPPING["responseGrouper"]["hygiene"]
    toilet_category = MAPPING["responseGrouper"]["toilet_category"]

    @classmethod
    def to_dict(cls):
        return [{**member.value, "name": member.name} for member in cls]


class GeoLevels(Enum):
    General = MAPPING["geo"]["levels"]


class GeoCenter(Enum):
    General = MAPPING["geo"]["center"]


class MainConfig:
    def __init__(self):
        self.FLOW_INSTANCE = "sig"
        self.CLASS_PATH = "General"
        self.CONFIG_PATH = CONFIG_PATH
        self.FORMS_PATH = f"{self.CONFIG_PATH}/forms.json"
        self.FORM_PATH = f"{self.CONFIG_PATH}/forms"
        self.FORM_CONFIG_PATH = self.FORMS_PATH
        self.TOPO_JSON_PATH = (
            f"{self.CONFIG_PATH}/geo/{MAPPING['geo']['topojson']}"
        )
        self.FRONTEND_CONFIG_PATH = self.CONFIG_PATH
        self.DATA_PATH = self.CONFIG_PATH
        self.CASCADE_PATH = f"{self.CONFIG_PATH}/cascades"
        self.ADMINISTRATION_PATH = f"{self.CONFIG_PATH}/administration"
        self.QuestionConfig = QuestionConfig
        self.SchoolInformationEnum = SchoolInformationEnum
        self.CascadeLevels = CascadeLevels
        self.CascadeNames = CascadeNames
        self.SchoolTypeRanking = SchoolTypeRanking
        self.ResponseGrouperCustomConfig = ResponseGrouperCustomConfig
        self.MONITORING_FORM = False
        self.MONITORING_ROUND = MAPPING["monitoring"]["round"]
        self.TMP_PATH = "./tmp"
        self.LOG_PATH = f"{self.TMP_PATH}/log"
        self.FAKE_STORAGE_PATH = f"{self.TMP_PATH}/fake-storage"
        self.DOWNLOAD_PATH = f"{self.TMP_PATH}/download"
        self.TEST_PATH = f"{self.TMP_PATH}/test"
        self.ERROR_PATH = f"{self.TMP_PATH}/error"


class geoconfig:
    GeoLevels = GeoLevels
    GeoCenter = GeoCenter


main_config = MainConfig()
