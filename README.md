# Names Dataset

List of popular first names and surnames in the US, ordered by popularity.

# SQLite Schema

## `surname`

| Column Name  | Type | Description                                  |
|--------------|------|----------------------------------------------|
| `name`       | TEXT | The last name                                |
| `popularity` | INT  | The popularity of the name in the US by rank |

## `firstname`

| Column Name    | Type    | Description                                                                       |
|----------------|---------|-----------------------------------------------------------------------------------|
| `name`         | TEXT    | The first name                                                                    |
| `popularity`   | INT     | The popularity of the name in the US by rank                                      |
| `birth_decade` | INT     | The decade of the name popularity data / birth of the people with the given name. |
| `male`         | BOOLEAN | Whether the name is given to boys                                                 |
| `female`       | BOOLEAN | Whether the name is given to girls                                                |

- &ast;Note: The `male` and `female` fields are derived from their appearance in the top 200 of the decade. eg. "Max" can is not a popular girl's name but it may be given to girls.

# Methodology

## First Names

### By Popularity

Data aggregated from scraping the website of the US Social Security Administration (Public Domain)

- https://www.ssa.gov/OACT/babynames/decades/names1940s.html
- ...
- https://www.ssa.gov/OACT/babynames/decades/names2010s.html

### Shortened variants (unimplemented)

Using the example normalized anglo name "Matthew", there may be variations in spelling and simplification of the person's real name such as Matt, Mathew, Matthias, Matteo, and Mateo. To handle those cases, we can try use https://en.wiktionary.org/wiki/Appendix:Male_given_names/[A-Z] and the corresponding female dataset. However, they're not the most reliable as we'll have to create best guesses for what each anglo name correlates to. For the purpose of this name database, I've declared this out of scope. Also see this reference project: https://github.com/solvenium/names-dataset/tree/master

## Surnames

Data sourced from 2010 US Census (Public Domain) https://www.census.gov/topics/population/genealogy/data/2010_surnames.html
