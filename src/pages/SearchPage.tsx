import { useParams } from "react-router-dom"
import { useSearchRestaurants } from "../api/RestaurantApi"
import SearchResultInfo from "../components/SearchResultInfo"
import SearchResultsCard from "../components/SearchResultsCard"
import { useEffect, useState } from "react"
import SearchBar, { SearchForm } from "../components/SearchBar"
import PaginationSelector from "../components/PaginationSelector"
import CuisineFilter from "../components/CuisineFilter"
import SortOptionDropdown from "../components/SortOptionDropdown"

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
}

const SearchPage = () => {
    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    })

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const { results, isLoading } = useSearchRestaurants(searchState, city)
    const [loadingIndex, setLoadingIndex] = useState<number>(0);

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1

        }))
    }

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }))
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page
        }))

    }


    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1

        }))

    }
    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1
        }))

    }

    const loadingText = [
        "loading",
        "loading.",
        "loading..",
        "loading..."
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingIndex((prevIndex) => (prevIndex + 1) % loadingText.length);
        }, 10);

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    if (isLoading) {
        return <span>{loadingText[loadingIndex]}</span>;
    }


    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() =>
                        setIsExpanded((prevIsExpanded) => !prevIsExpanded)
                    }
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    placeHolder="Search by Cuisine or Restaurant Name" onSubmit={setSearchQuery}
                    onReset={resetSearch} />

                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results.pagination.total} city={city} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>

                {results.data.map((restaurant) => (
                    <SearchResultsCard restaurant={restaurant} />

                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages}
                    onPageChange={setPage} />
            </div>
        </div>
    )
}

export default SearchPage