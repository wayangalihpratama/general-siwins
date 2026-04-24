import os
from enum import Enum

INSTANCE_NAME = os.getenv("SIWINS_INSTANCE", "test")


class QuestionConfig(Enum):
    year_conducted = 596240919
    school_information = 634200919
    school_type = 647020917
    school_category = 634280919


class SchoolInformationEnum(Enum):
    province = "province"
    school_type = "school_type"
    school_name = "school_name"
    school_code = "school_code"
    school_category = "school_category"


class CascadeLevels(Enum):
    school_information = {
        "province": 0,
        "school_type": 1,
        "school_name": 2,
        "school_code": 3,
    }


class CascadeNames(Enum):
    school_information = {
        "province": "Province",
        "school_type": "School Type",
        "school_name": "School Name",
        "school_code": "School Code",
    }


class SchoolTypeRanking(Enum):
    has_ranking = ["early", "primary", "secondary", "community"]
    rankings = {"early": 0, "primary": 1, "secondary": 3, "community": 4}


class ResponseGrouperCustomConfig(Enum):
    water = {"question_group": None, "category_type": "jmp"}
    sanitation = {"question_group": None, "category_type": "jmp"}
    hygiene = {"question_group": None, "category_type": "jmp"}
    toilet_category = {"question_group": 7, "category_type": None}

    @classmethod
    def to_dict(cls):
        return [{**member.value, "name": member.name} for member in cls]


class GeoLevels(Enum):
    General = [
        {"level": 0, "name": "province", "alias": "Province"},
        {"level": 1, "name": "constituency", "alias": "Constituency"},
    ]


class GeoCenter(Enum):
    General = [-9.6, 160.1]


class MainConfig:
    def __init__(self):
        self.FLOW_INSTANCE = "sig"
        self.CLASS_PATH = "General"
        self.CONFIG_PATH = "/app/config"
        self.FORMS_PATH = f"{self.CONFIG_PATH}/forms.json"
        self.TOPO_JSON_PATH = (
            f"{self.CONFIG_PATH}/geo/solomon-island-topojson.json"
        )
        self.FRONTEND_CONFIG_PATH = self.CONFIG_PATH
        self.DATA_PATH = self.CONFIG_PATH
        self.CASCADE_PATH = f"{self.CONFIG_PATH}/cascades"
        self.QuestionConfig = QuestionConfig
        self.SchoolInformationEnum = SchoolInformationEnum
        self.CascadeLevels = CascadeLevels
        self.CascadeNames = CascadeNames
        self.SchoolTypeRanking = SchoolTypeRanking
        self.ResponseGrouperCustomConfig = ResponseGrouperCustomConfig
        self.MONITORING_FORM = False
        self.MONITORING_ROUND = 2024
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
