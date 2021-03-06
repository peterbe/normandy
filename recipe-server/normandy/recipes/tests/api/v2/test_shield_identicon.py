import pytest

from normandy.recipes.api.v2.shield_identicon import Genome


@pytest.fixture
def genome():
    seed = 123
    return Genome(seed)


class TestGenome(object):
    """
    Tests the Genome module by setting the seed to a known value and making sure that the
    random choices remain consistent, ie. they do not change over time.
    """
    def test_weighted_choice(self, genome):
        weighted_options = [
            {'weight': 1, 'value': 'apple'},
            {'weight': 2, 'value': 'orange'},
            {'weight': 4, 'value': 'strawberry'},
        ]
        weighted_choice_values = [
            genome.weighted_choice(weighted_options),
            genome.weighted_choice(weighted_options),
            genome.weighted_choice(weighted_options),
        ]
        assert weighted_choice_values == [
            {'weight': 1, 'value': 'apple'},
            {'weight': 2, 'value': 'orange'},
            {'weight': 1, 'value': 'apple'},
        ]

    def test_emoji(self, genome):
        emoji_values = [
            genome.emoji(),
            genome.emoji(),
            genome.emoji(),
        ]
        assert emoji_values == ['😅', '🐯', '😈']

    def test_color(self, genome):
        color_values = [
            genome.color().rgb_color,
            genome.color().rgb_color,
            genome.color().rgb_color,
        ]
        assert color_values == [
            (7, 54, 66),
            (255, 207, 0),
            (88, 110, 117)
        ]
