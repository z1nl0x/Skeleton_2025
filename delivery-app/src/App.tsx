import {lazy, Suspense} from 'react'
import {ErrorBoundary, type FallbackProps} from 'react-error-boundary'
import {Route, Routes} from 'react-router'
import {LoadingOrError} from '@/components/LoadingOrError'
// import {Gallery} from '@/pages/Gallery'
import Home from './pages/Home'
import Login from './pages/Login'

// const Details = lazy(async () =>
// 	import('@/pages/Details').then(m => ({default: m.Details}))
// )

function renderError({error}: FallbackProps) {
	return <LoadingOrError error={error} />
}

export function App() {
	return (
		<ErrorBoundary fallbackRender={renderError}>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</Suspense>
		</ErrorBoundary>
	)
}
