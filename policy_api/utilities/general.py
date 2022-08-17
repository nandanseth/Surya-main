""" 
policy_api/utilities/general.py

This modules contains general utility functions that can be used
across the policy API service.
"""

from google.api_core.datetime_helpers import DatetimeWithNanoseconds


# TODO: Might need this later, so it was written.
def datetime_with_nanosecs_to_str(v: DatetimeWithNanoseconds):
    return f"{v.year},{v.month},{v.day},{v.hour}, {v.minute}, {v.second}, {v.tzinfo}"


def get_dict_updates(old: dict, new: dict) -> dict:
    """Determines the updates made to a dictionary.

    Args:
        old (dict): the original dictionary
        new (dict): the (presumably) updated dictionary

    Returns:
        dict: A dict with the removed, added and updated key-value pairs.
    """

    KEY_NAME_FOR_REMOVED = "__removed__"
    KEY_NAME_FOR_ADDED = "__added__"
    KEY_NAME_FOR_UPDATES = "__updates__"
    difference = {
        KEY_NAME_FOR_REMOVED: {},
        KEY_NAME_FOR_ADDED: {},
        KEY_NAME_FOR_UPDATES: {},
    }

    for k, v in old.items():
        if k not in new.keys():
            difference[KEY_NAME_FOR_REMOVED][k] = v

    for k, v in new.items():
        if k in old:
            if type(v) == type(old[k]):
                if isinstance(v, dict):
                    diff = get_dict_updates(old[k], v)
                    if diff:
                        difference[KEY_NAME_FOR_UPDATES][k] = diff
                    else:
                        continue

                if any([isinstance(v, t) for t in [str, float, int, bytes]]):
                    if v != old[k]:
                        difference[KEY_NAME_FOR_UPDATES][k] = v
            else:
                difference[KEY_NAME_FOR_UPDATES][k] = v
        else:
            difference[KEY_NAME_FOR_ADDED][k] = v
    return difference
